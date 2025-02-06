"use client";
import { useParams } from "next/navigation";
import MobileChatHeader from "@/app/components/chat/mobile/chatPageHeader";
import FlightChat from "@/app/components/chat/flightChat";

interface MobileChatPageProps {
  chatId: string | null;
  onBack: () => void;
}

export default function MobileChatPage({ chatId, onBack }: MobileChatPageProps) {
  if (!chatId) return null; // Prevents rendering if chatId is null

  return (
    <div className="w-full h-full flex flex-col bg-[#121212] p-4">
      {/* Mobile Header with Back Button */}
      <MobileChatHeader onBack={onBack} />

      {/* Chat Window */}
      <FlightChat flightCode={chatId} userId="user123" />
    </div>
  );
}
