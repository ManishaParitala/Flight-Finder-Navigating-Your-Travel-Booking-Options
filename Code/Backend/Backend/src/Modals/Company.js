const mongoose = require("mongoose");

// Define the Company schema
const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true },
  website: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Company model
const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
