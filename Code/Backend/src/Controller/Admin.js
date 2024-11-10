import { Router } from "express";
import mongoose from "mongoose";
import Company from "../Modals/Company";
import Customer from "../Modals/Customer";
import Flight from "../Modals/Flight";
import jwt from "jsonwebtoken";

// routes
const router = Router();

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "admin@gmail.com" && password === "admin") {
      const token = jwt.sign({ email: email }, "secret", { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: ["Login successful"] });
    } else {
      return res.status(400).json({ message: ["Invalid credentials"] });
    }
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: ["Unauthorized"] });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: ["Unauthorized"] });
    }
    req.body.customer = decoded;
    next();
  });
};

// Get the company
router.get("/viewcompany", async (req, res, next) => {
  try {
    const company = await Company.find();
    return res.status(200).json({ message: [], company });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// Update status of company
router.put("/updatecompany/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const company = await Company.findByIdAndUpdate(id, { status: status });
    return res.status(200).json({ message: ["Company status updated"], company });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// Get the customer
router.get("/viewcustomer", async (req, res, next) => {
  try {
    const customer = await Customer.find();
    return res.status(200).json({ message: [], customer });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// Get the flight
router.get("/viewflight", async (req, res, next) => {
  try {
    const flight = await Flight.find();
    return res.status(200).json({ message: [], flight });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// Logout
router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: ["Logout successful"] });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

export default router;

