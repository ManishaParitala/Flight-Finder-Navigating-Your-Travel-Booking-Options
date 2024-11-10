import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Admin from "./Controller/Admin";
import Company from "./Controller/Company";
import Customer from "./Controller/Customer";
import path from "path";

const app = express();

app.use(
  cors({
    origin: " http://192.168.1.130:5175/",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
const uri = "mongodb://localhost:27017/flightnew";
const port = 4000;

const server = async () => {
  try {
    const db = await mongoose.connect(uri);
    if (db) {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

server();

// Routes
app.use("/api/admin", Admin);
app.use("/api/company", Company);
app.use("/api/customer", Customer);
