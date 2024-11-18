const mongoose = require("mongoose");

// Define the Flight schema
const FlightSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  flight_name: { type: String, required: true },
  flight_no: { type: String, required: true, unique: true },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  date: { type: Date, required: true },
  seat_type: { type: String, required: true },
  seat_capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  discountPrice: { type: String },
  seats: [
    {
      seat_number: { type: String, required: true },
      is_available: { type: Boolean, default: true },
    },
  ],
});

// Create the Flight model
const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;
