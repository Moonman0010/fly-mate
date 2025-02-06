"use client";
import { useState } from "react";
import MobileChatList from "@/app/components/chat/mobile/chatListPage";
import MobileChatPage from "@/app/components/chat/mobile/chatPage";
import ExtraSidebar from "@/app/components/chat/extraSidebar";
import ChatSidebar from "@/app/components/chat/chatSidebar/chatSidebar";
import FlightChat from "@/app/components/chat/flightChat";

interface ChatPageProps {
  flightCode: string;
  userId: string;
}

export default function ChatPage({ flightCode, userId }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen grid grid-cols-12 bg-black text-white p-4 gap-4 overflow-hidden">
      {/* 📌 Desktop View (MD+ screens) */}
      <div className="hidden md:flex col-span-3 h-full rounded-lg overflow-hidden">
        <ExtraSidebar className="flex-shrink-0" />
        <ChatSidebar className="flex-1 h-full rounded-r-lg" onSelectChat={setSelectedChat} />
      </div>

      <div className="hidden md:flex col-span-9 flex-col bg-[#121212] rounded-lg p-4 h-full">
        {selectedChat ? (
          <FlightChat flightCode={selectedChat} userId={userId} />
        ) : (
          <p className="text-center text-gray-400">Select a chat to start messaging</p>
        )}
      </div>

      {/* 📌 Mobile View (Only one component should be shown at a time) */}
      <div className="col-span-12 flex md:hidden w-full h-full">
        {!selectedChat ? (
          <MobileChatList onSelectChat={setSelectedChat} />
        ) : (
          <MobileChatPage chatId={selectedChat} onBack={() => setSelectedChat(null)} />
        )}
      </div>
    </div>
  );
}