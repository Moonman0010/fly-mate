"use client";
import React from "react";

interface ChatBubbleProps {
  message: string;
  isMine?: boolean;
}

export default function ChatBubble({ message, isMine }: ChatBubbleProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isMine ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
