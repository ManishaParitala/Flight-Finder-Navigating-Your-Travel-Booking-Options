const { Router } = require("express");
const mongoose = require("mongoose");
const Company = require("../Modals/Company");
const Customer = require("../Modals/Customer");
const Flight = require("../Modals/Flight");
const jwt = require("jsonwebtoken");

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

// get the company
router.get("/viewcompany", async (req, res, next) => {
  try {
    const company = await Company.find();
    return res.status(200).json({ message: [], company });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// update status of company
router.put("/updatecompany/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const company = await Company.findByIdAndUpdate(id, { status: status });
    return res
      .status(200)
      .json({ message: ["Company status updated"], company });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// get the customer
router.get("/viewcustomer", async (req, res, next) => {
  try {
    const customer = await Customer.find();
    return res.status(200).json({ message: [], customer });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// get the flight
router.get("/viewflight", async (req, res, next) => {
  try {
    const flight = await Flight.find();
    return res.status(200).json({ message: [], flight });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

// logout
router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: ["Logout successful"] });
  } catch (err) {
    return res.status(500).json({ message: ["Internal server error"] });
  }
});

module.exports = router;
