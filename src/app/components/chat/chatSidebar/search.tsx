"use client";

import React, { useState } from "react";

interface ChatSearchProps {
  onSearch: (query: string) => void;
}

export default function ChatSearch({ onSearch }: ChatSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search chats..."
        className="w-full p-3 rounded-lg bg-[#222] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}