"use client";
import React from "react";

interface ChatHeaderProps {
  title: string;
}

export default function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <div className="text-black font-bold text-3xl">
      {title}
    </div>
  );
}