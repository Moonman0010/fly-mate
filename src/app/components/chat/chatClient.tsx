"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

type MessageType = {
  userId: string;
  content: string;
  timestamp: string; // or Date
};

interface ChatClientProps {
  channelId: string;   // The channel the user wants to join
  userId: string;      // The current user
  socketUrl: string;   // e.g. "http://localhost:5000"
}

export default function ChatClient({
  channelId,
  userId,
  socketUrl
}: ChatClientProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");

  // On mount, connect to socket server
  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket"], // optional, but often recommended
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  // Join the channel once the socket is ready
  useEffect(() => {
    if (socket && channelId && userId) {
      socket.emit("join_chat", { channelId, userId });

      // Listen for join errors
      socket.on("error", (errMsg) => {
        alert(`Socket error: ${errMsg}`);
      });
    }
  }, [socket, channelId, userId]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    // This is the event name from server: "receive_message"
    socket.on("receive_message", (msg: { userId: string; content: string; timestamp: string }) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Optional: user_joined, user_left
    socket.on("user_joined", ({ userId, count }) => {
      console.log(`User ${userId} joined. Channel count: ${count}`);
    });
    socket.on("user_left", ({ count }) => {
      console.log(`A user left. Channel count: ${count}`);
    });

    // Clean up listeners on unmount or re-render
    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, [socket]);

  // Handle sending a new message
  const handleSend = () => {
    if (!inputValue.trim() || !socket) return;

    const newMsg = {
      channelId,
      userId,
      content: inputValue.trim(),
    };

    // Emit to server
    socket.emit("send_message", newMsg);

    // We can optimistically add to local messages OR wait for server "receive_message"
    // Let's rely on "receive_message" so everyone has consistent timestamps
    setInputValue("");
  };

  return (
    <div className="border p-4 max-w-md mx-auto">
      <h2 className="font-bold mb-2">Channel: {channelId}</h2>
      <div className="border h-64 overflow-auto p-2 mb-2 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.userId === userId ? "text-blue-500" : ""}`}>
            <strong>{msg.userId === userId ? "Me" : msg.userId}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border flex-1 p-1"
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
}