"use client";

import React from "react";

export default function ChatSidebar() {
  return (
    <aside className=" w-96 bg-[#1a1a1a] text-yellow-400 p-6 flex flex-col rounded-r-lg">
      <h2 className="text-xl font-bold mb-6">Chats</h2>
      <div className="flex flex-col space-y-4 overflow-y-auto">
        <button className="p-4 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
          Flight Chat Room 1
        </button>
        <button className="p-4 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
          Flight Chat Room 2
        </button>
      </div>
    </aside>
  );
}
