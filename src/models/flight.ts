import mongoose, { Schema, models } from "mongoose";

const FlightSchema = new Schema({
  airline: { type: String, required: false },
  flightNumber: { type: String, required: true },
  departure: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
  arrival: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:mm (24-hour format)
  flightCode: { type: String }, // Unique identifier
  passengers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

FlightSchema.index({ flightCode: 1 }, { unique: true });

const Flight = models.Flight || mongoose.model("Flight", FlightSchema);
export default Flight;
