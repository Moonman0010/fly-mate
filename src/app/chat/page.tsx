"use client";

import { useState } from "react";
import FlightChat from "@/app/components/chat/flightChat";
import ExtraSidebar from "@/app/components/chat/extraSidebar";
import ChatSidebar from "@/app/components/chat/chatSidebar";

export default function ChatPage() {
  // Example flight and user ID (replace with real values or state management later)
  const flightCode = "FL1234";
  const userId = "user_001";

  return (
    <div className="h-screen w-screen grid grid-cols-12 bg-black text-white p-4 gap-4">
      {/* Extra Thin Sidebar & Left Sidebar Sticking Together */}
      <div className="col-span-3 flex rounded-lg overflow-hidden">
        <ExtraSidebar />
        <ChatSidebar />
      </div>

      {/* Chat Window */}
      <div className="col-span-9 flex flex-col bg-[#121212] rounded-lg p-4">
        <FlightChat flightCode={flightCode} userId={userId} />
      </div>
    </div>
  );
}
