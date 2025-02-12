"use client";

import React, { useState } from "react";
import ChatSearch from "./search";
import ChatFilters from "./filter";
import ChatList from "./list";

interface ChatSidebarProps {
  className?: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatSidebar({ className, onSelectChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  return (
    <aside className={`w-96 bg-[#1a1a1a] text-yellow-400 p-4 flex flex-col h-screen overflow-hidden ${className}`}  style={{ minWidth: "250px"}}>
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      
      {/* Pass search state to ChatSearch */}
      <ChatSearch onSearch={setSearchQuery} />

      <ChatFilters />

      {/* Pass search query to ChatList for filtering */}
      <ChatList onSelectChat={onSelectChat} searchQuery={searchQuery} />
    </aside>
  );
}
