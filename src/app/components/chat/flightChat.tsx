"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatBubble from "./chatBubble"; // Import your message component

const SOCKET_URL = "http://localhost:5000";

export default function FlightChat({
  flightCode,
  userId, // The current user's ID
}: {
  flightCode: string;
  userId: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<
    { userId: string; message: string; subChat: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [subChats, setSubChats] = useState<string[]>([]);
  const [activeSubChat, setActiveSubChat] = useState("");

  useEffect(() => {
    // 1. Fetch subchats from your backend or user’s itinerary
    fetch(`/api/subchats?flightCode=${flightCode}&userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // data.subChats might be ["General", "Boarding", "Arrivals", etc.]
        setSubChats(data.subChats || []);

        // Optional: set the first subchat as active
        if (data.subChats?.length > 0) {
          setActiveSubChat(data.subChats[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to load subchats", err);
        setSubChats([]);
      });

    // 2. Connect to Socket.io
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // 3. Join the flight chat room
    newSocket.emit("join_chat", { flightCode, userId });

    // 4. Listen for incoming messages
    newSocket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [flightCode, userId]);

  // Send a new message
  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;

    const newMessage = {
      userId,         // from props
      message,
      subChat: activeSubChat,
    };

    // Emit to the server
    socket.emit("send_message", { flightCode, ...newMessage });

    // Update local state
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div>
      {/* SubChat tabs (dynamic) */}
      <div className="subchat-tabs">
        {subChats.map((sub) => (
          <button
            key={sub}
            className={activeSubChat === sub ? "active" : ""}
            onClick={() => setActiveSubChat(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="chat-area">
        {messages
          .filter((msg) => msg.subChat === activeSubChat)
          .map((msg, idx) => (
            <ChatBubble
              key={idx}
              userId={msg.userId}
              message={msg.message}
              isCurrentUser={msg.userId === userId} // Use userId prop to check ownership
            />
          ))}
      </div>

      {/* Input area */}
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
