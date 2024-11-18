const mongoose = require("mongoose");

// Define the Customer schema
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  Notification: [
    {
      message: String,
    },
  ],
  otp: Number,
});

// Create the Customer model
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
