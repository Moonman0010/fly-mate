import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import { authenticate } from "@/server/middleware/auth";
import { AppError, handleError } from "@/server/shared/error";
import Channel from "@/server/models/channel";
import User from "@/server/models/user";
import { format } from "date-fns"; // To format date
import mongoose from "mongoose";

//
// POST /api/channel
// Body: { userId, destinationCode, travelDate, ethnicity? }
// Creates a structured channelId based on itinerary and ethnicity.
//
export async function POST(req: Request) {
  try {
    // 1) Authenticate user
    const authUser = authenticate(req);
    if (authUser instanceof NextResponse) return authUser;

    // Extract userId
    const userId = typeof authUser === "string" ? authUser : authUser.userId;

    // 2) Connect to DB
    await connectToDatabase();

    // 3) Parse request body
    const { destinationCode, travelDate, ethnicity } = await req.json();

    if (!destinationCode || !travelDate) {
      throw new AppError("destinationCode and travelDate are required.", 400);
    }

    // Generate structured channelId (Example: u123-LAX-20240215)
    const formattedDate = format(new Date(travelDate), "yyyyMMdd");
    const channelId = `${userId}-${destinationCode}-${formattedDate}`;

    // Check if the channel already exists
    let channel = await Channel.findOne({ channelId });

    if (!channel) {
      // Create main channel if it doesn't exist
      channel = await Channel.create({
        channelId,
        name: `Chat for ${destinationCode} on ${formattedDate}`,
        type: "main",
        parentId: null,
      });
    }

    // (Optional) Create a sub-chat based on ethnicity
    let ethnicityChat = null;
    if (ethnicity) {
      const ethnicityChannelId = `${channelId}-${ethnicity}`;
      ethnicityChat = await Channel.findOne({ channelId: ethnicityChannelId });

      if (!ethnicityChat) {
        ethnicityChat = await Channel.create({
          channelId: ethnicityChannelId,
          name: `${ethnicity} Travelers to ${destinationCode}`,
          type: "sub",
          parentId: channelId,
        });
      }
    }

    // Return the created or found channels
    return NextResponse.json({ channel, ethnicityChat }, { status: 201 });
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
