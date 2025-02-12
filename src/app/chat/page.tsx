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
    <div className="h-screen w-screen flex bg-black text-white p-4 gap-4 overflow-hidden">
    {/* Sidebar - Fixed on the left, outside the grid*/}
    <div className="hidden md:flex h-full w-[500px] rounded-lg overflow-hidden flex-shrink-0">
      <ExtraSidebar className="flex-shrink-0" />
      <ChatSidebar className="flex-1 h-full rounded-r-lg" onSelectChat={setSelectedChat} />
    </div>  
  
    {/* Main Chat Section - Fully Expands */}
    <div className="flex-1 flex flex-col bg-[#121212] rounded-lg p-4 h-full min-w-0">
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