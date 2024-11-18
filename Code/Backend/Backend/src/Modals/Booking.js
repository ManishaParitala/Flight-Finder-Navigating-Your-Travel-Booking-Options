const mongoose = require("mongoose");

// Define the Booking schema
const BookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  flight_id: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  booking_date: { type: Date, required: true },
  no_of_seats: { type: Number, required: true },
  booking: [
    {
      passenger_name: { type: String, required: true },
      seat_no: { type: String, required: true },
      passenger_age: { type: Number, required: true },
    },
  ],
  price: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Booking model
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
