import mongoose, { Schema, models } from "mongoose";

const FlightSchema = new Schema({
  airline: { type: String, required: false },
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:mm (24-hour format)
  flightCode: { type: String, unique: true }, // Unique identifier
  passengers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Flight = models.Flight || mongoose.model("Flight", FlightSchema);
export default Flight;
