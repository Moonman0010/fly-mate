"use client";

import { useState, useEffect, useRef } from "react";
import ChatBubble from "./chatBubble";
import ChatInput from "./chatInput";

export default function FlightChat({ flightCode, userId }: { flightCode: string; userId: string }) {
  const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { userId, message: text }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#121212] rounded-lg">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#1a1a1a] rounded-t-lg shadow-md flex flex-col">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.message} isMine={msg.userId === userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Component - Stick to Bottom */}
      <div className="sticky bottom-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
