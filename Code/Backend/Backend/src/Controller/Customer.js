const { Router } = require("express");
const { Request, Response, NextFunction } = require("express");
const Customer = require("../Modals/Customer");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Flight = require("../Modals/Flight");
const Booking = require("../Modals/Booking");
const mongoose = require("mongoose");
const { SendForgotPassword, SendOrderConfirm } = require("./Sendmail");

const router = Router();

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/customers");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// multer file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// register customer
router.post("/register", upload.single("photo"), async (req, res, next) => {
    try {
        const { name, email, phone, password, address } = req.body;
        const photo = req.file?.filename;
        const checkemail = await Customer.findOne({ email: email });
        if (checkemail) {
            return res.status(400).json({ message: ["Email already exists"] });
        } else {
            const NewCustomer = await Customer.create({
                name,
                email,
                phone,
                password,
                address,
                photo,
            });
            if (NewCustomer) {
                return res.status(201).json({ message: ["Customer created successfully"] });
            } else {
                return res.status(400).json({ message: ["Customer not created"] });
            }
        }
    } catch (err) {
        next(err);
        console.error(err);
        return res.status(500).json({ message: ["Internal server error"] });
    }
});

// login customer
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email: email });
        if (customer) {
            if (customer.password === password) {
                const token = jwt.sign({ id: customer._id, email: customer.email }, "secret", { expiresIn: "1h" });
                res.cookie("token", token, { httpOnly: true });
                return res.status(200).json({ message: ["Login successful"], customer });
            } else {
                return res.status(400).json({ message: ["Invalid credentials"] });
            }
        } else {
            return res.status(400).json({ message: ["Invalid credentials"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});

const generateotp = () => {
    const otp = Math.floor(Math.random() * 1000);
    return otp.toString().padStart(4, "7");
};

// forgot password
router.put("/sendotp", async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Customer.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: ["No user found with this email"] });
        } else {
            const otp = generateotp();
            await Customer.findByIdAndUpdate(user._id, { otp: otp });
            SendForgotPassword(email, otp);
            return res.status(200).json({ success: true, message: ["OTP sent successfully"] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: ["Internal server error"] });
    }
});

// verify otp
router.post("/verifyotp", async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const User = await Customer.findOne({ email: email, otp: otp });
        if (!User) {
            return res.status(404).json({ success: false, message: "Invalid OTP" });
        } else {
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Other routes remain unchanged...

module.exports = router;
