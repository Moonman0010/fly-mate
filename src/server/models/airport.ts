import mongoose, { Schema, models } from "mongoose";

const AirportSchema = new Schema({
  name: { type: String, required: true, trim: true },
  iata_code: { type: String, unique: true, sparse: true, uppercase: true, trim: true }, // 3-letter IATA code
  country: { type: String, trim: true }
});

const Airport = models.Airport || mongoose.model("Airport", AirportSchema);
export default Airport;