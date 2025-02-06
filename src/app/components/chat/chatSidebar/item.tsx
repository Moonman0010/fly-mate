"use client";

import React from "react";

interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  isGroup: boolean;
  profilePic: string;
}

export default function ChatItem({ name, message, time, isGroup, profilePic }: ChatItemProps) {
  return (
    <div className="flex items-center p-3 bg-[#222] rounded-lg cursor-pointer hover:bg-[#333] transition">
      {/* Profile Picture or Emoji */}
      {isGroup ? (
        <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
          {profilePic}
        </div>
      ) : (
        <img src={profilePic} alt="User" className="w-12 h-12 rounded-full" />
      )}

      {/* Chat Details */}
      <div className="ml-3">
        <p className="text-white font-bold">{name}</p>
        <p className="text-gray-400 text-sm truncate max-w-[200px]">{message}</p>
      </div>

      {/* Timestamp */}
      <span className="ml-auto text-gray-400 text-sm">{time}</span>
    </div>
  );
}