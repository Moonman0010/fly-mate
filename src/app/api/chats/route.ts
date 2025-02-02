import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import Chat from "@/server/models/chat";
import { authenticate } from "@/server/middleware/auth";
import { handleError } from "@/server/shared/error";

export async function POST(req: Request) {
  try {
    const user = authenticate(req);
    if (user instanceof NextResponse) return user; // Ensure authentication

    await connectToDatabase();
    const { flightCode, name, members, linkedChats } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Chat name is required" }, { status: 400 });
    }

    // ✅ If linkedChats is empty, create a flight-level chat
    const isMainChat = !linkedChats || linkedChats.length === 0;
    let level = 0;

    if (!isMainChat) {
      // ✅ Fetch the last chat in the hierarchy to determine the new level
      const parentChat = await Chat.findById(linkedChats[linkedChats.length - 1]);
      if (!parentChat) {
        return NextResponse.json({ error: "Invalid parent chat" }, { status: 400 });
      }
      level = parentChat.level + 1;
    }

    // ✅ Check if chat already exists
    const existingChat = await Chat.findOne({ flightCode, name, level });
    if (existingChat) {
      return NextResponse.json({ message: "Chat already exists", chat: existingChat }, { status: 200 });
    }

    // ✅ Create chat
    const newChat = await Chat.create({
      flightCode,
      name,
      type: isMainChat ? "flight" : "subchat",
      level,
      members,
      linkedChats: linkedChats || []
    });

    return NextResponse.json({ message: "Chat Created", chat: newChat }, { status: 201 });

  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

export async function GET(req: Request) {
    try {
      await connectToDatabase();
  
      const { searchParams } = new URL(req.url);
      const flightCode = searchParams.get("flightCode");
      const parentChatId = searchParams.get("parentChatId") || null;
  
      if (!flightCode) {
        return NextResponse.json({ error: "FlightCode is required" }, { status: 400 });
      }
  
      let query: any = { flightCode };
  
      if (parentChatId) {
        query = { ...query, linkedChats: parentChatId };
      } else {
        query = { ...query, level: 0 };
      }
  
      const chats = await Chat.find(query);
  
      return NextResponse.json({ chats }, { status: 200 });
  
    } catch (error) {
      const { status, body } = handleError(error);
      return NextResponse.json(body, { status });
    }
  }
