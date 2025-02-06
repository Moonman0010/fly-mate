"use client";

import React from "react";

export default function ChatFilters() {
  return (
    <div className="flex gap-2 mb-4">
      <button className="px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700 transition">
        All
      </button>
      <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition">
        Unread
      </button>
      <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition">
        Favorites
      </button>
      <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition">
        Groups
      </button>
    </div>
  );
}
