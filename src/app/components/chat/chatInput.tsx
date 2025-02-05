"use client";

import React, { useState } from "react";
import { FiPlus, FiSend } from "react-icons/fi";
import { AiOutlinePaperClip } from "react-icons/ai";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3 bg-black-700 rounded-b-lg border-4 border-[#1a1a1a]  shadow-md">
      {/* Plus Button for Attachments */}
      <button type="button" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
        <FiPlus className="text-white text-lg" />
      </button>

      {/* Attachment Button */}
      <button type="button" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
        <AiOutlinePaperClip className="text-white text-lg" />
      </button>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          type="text"
          className="w-full border-none p-3 rounded-full bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-yellow-500 px-4"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
      </div>

      {/* Send Button */}
      <button
        type="submit"
        className="p-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition flex items-center justify-center"
      >
        <FiSend className="text-lg" />
      </button>
    </form>
  );
}
