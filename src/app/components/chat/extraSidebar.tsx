"use client";

import React from "react";

export default function ExtraSidebar() {
  return (
    <div className="w-16 bg-black-700 flex flex-col items-center p-4 border-2 rounded-l-lg border-[#1a1a1a]">
      <div className="w-10 h-10 bg-yellow-500 rounded-full mb-4 cursor-pointer hover:bg-yellow-400 transition"></div>
      <div className="w-10 h-10 bg-yellow-500 rounded-full mb-4 cursor-pointer hover:bg-yellow-400 transition"></div>
      <div className="w-10 h-10 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition"></div>
    </div>
  );
}