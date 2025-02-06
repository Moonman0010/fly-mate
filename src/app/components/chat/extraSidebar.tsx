"use client";

import React from "react";

interface ChatSidebarProps {
  className?: string; // Allow className to be passed as a prop
} 

export default function ExtraSidebar(className: ChatSidebarProps) {
  return (
    <div className={`w-16 bg-black-700 flex flex-col items-center p-4 border-2 rounded-l-lg border-[#1a1a1a] ${className}`}>
      <div className="w-10 h-10 bg-yellow-500 rounded-full mb-4 cursor-pointer hover:bg-yellow-400 transition"></div>
      <div className="w-10 h-10 bg-yellow-500 rounded-full mb-4 cursor-pointer hover:bg-yellow-400 transition"></div>
      <div className="w-10 h-10 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition"></div>
    </div>
  );
}