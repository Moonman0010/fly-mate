// src/app/api/messages/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import Message from "@/server/models/message";
import Channel from "@/server/models/channel";

/**
 * POST /api/messages
 * Body: { channelId, userId, content }
 * Creates a new message in the given channel.
 */
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { channelId, userId, content } = await req.json();

    // 1. Basic validation
    if (!channelId || !userId || !content) {
      return NextResponse.json(
        { error: "channelId, userId, and content are required" },
        { status: 400 }
      );
    }

    // 2. Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return NextResponse.json(
        { error: "Channel not found. Provide a valid channelId." },
        { status: 404 }
      );
    }

    // 3. (Optional) If you have a user model, you could check the user as well
    //    For example:
    //    const user = await User.findById(userId);
    //    if (!user) {
    //      return NextResponse.json({ error: "User not found" }, { status: 404 });
    //    }

    // 4. Create the message
    const newMessage = await Message.create({
      channelId,
      userId,
      content,
    });

    // 5. Return the created message
    return NextResponse.json(newMessage, { status: 201 });
  } catch (err: any) {
    console.error("Error creating message:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create message" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/messages?channelId=abc123
 * Returns messages in a given channel. You can add pagination, sorting, etc.
 */
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const channelId = url.searchParams.get("channelId");

    if (!channelId) {
      return NextResponse.json(
        { error: "channelId is required in query params" },
        { status: 400 }
      );
    }

    // (Optional) Implement pagination, e.g. ?limit=50&skip=0
    const limit = Number(url.searchParams.get("limit")) || 50;
    const skip = Number(url.searchParams.get("skip")) || 0;

    // 1. Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return NextResponse.json(
        { error: "Channel not found." },
        { status: 404 }
      );
    }

    // 2. Fetch messages
    //    Usually sorted by newest or oldest, e.g. ascending by createdAt
    const messages = await Message.find({ channelId })
      .sort({ createdAt: 1 })  // oldest first
      .skip(skip)
      .limit(limit)
      .exec();

    // 3. Return messages
    return NextResponse.json(messages, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching messages:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
