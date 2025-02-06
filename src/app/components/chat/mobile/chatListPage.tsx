"use client";

import React, { useState } from "react";
import MobileChatListHeader from "@/app/components/chat/mobile/chatListHeader";
import ChatSearch from "@/app/components/chat/chatSidebar/search";
import ChatFilters from "@/app/components/chat/chatSidebar/filter";
import ChatList from "@/app/components/chat/chatSidebar/list"; // Reuse existing ChatList

interface MobileChatListProps {
  onSelectChat: (chatId: string) => void;
}

export default function MobileChatList({ onSelectChat }: MobileChatListProps) {
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  return (
    <div className="w-full h-full flex flex-col bg-black text-yellow-400 p-4">
      {/* Mobile Header */}
      <MobileChatListHeader />

      {/* Search Bar & Filters */}
      <ChatSearch onSearch={setSearchQuery} />
      <ChatFilters />

      {/* Chat List - Pass `searchQuery` to filter chats */}
      <ChatList onSelectChat={onSelectChat} searchQuery={searchQuery} />
    </div>
  );
}