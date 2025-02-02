import mongoose, { Schema, models } from "mongoose";

const AirlineSchema = new Schema({
  name: { type: String, required: true },
  iata_code: { type: String, unique: true, sparse: true },
  country: { type: String }
});

const Airline = models.Airline || mongoose.model("Airline", AirlineSchema);
export default Airline;