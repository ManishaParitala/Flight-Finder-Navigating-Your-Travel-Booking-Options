import mongoose from "mongoose";
import { Router } from "express";
import Customer from "../Modals/Customer";
import multer from "multer";
import path from "path";
import fs from "fs";
import Company from "../Modals/Company";
import jwt from "jsonwebtoken";
import Flight from "../Modals/Flight";
import Booking from "../Modals/Booking";

const router = Router();

// register company
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/company");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
});

// multer file filter
const fileFilter = (req, file, cb) => {
    try {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error("Only images are allowed");
        }
        cb(null, true)
    } catch (err) {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/register", upload.single("photo"), async (req, res) => {
    try {
        const { name, email, phone, password, address, website } = req.body;
        const photo = req.file?.filename;
        const checkemail = await Company.findOne({ email: email });
        console.log(checkemail, "checkemail");
        if (checkemail) {
            return res.status(400).json({ message: ["Email already exists"] })
        } else {
            const company = await Company.create({
                name, email, phone, password, address, photo, website, status: "pending"
            });
            if (company) {
                return res.status(201).json({ message: ["Company registered successfully"] })
            } else {
                return res.status(400).json({ message: ["Company not registered"] })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: ["internal server error"] })
    }
});

// login company
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ email: email });
        if (company?.status === "pending") {
            return res.status(400).json({ message: ["Company not approved"] })
        }
        if (company) {
            if (company.password === password) {
                const token = jwt.sign({ id: company._id, email: company.email }, "secret");
                res.cookie("token", token, { httpOnly: true });
                return res.status(200).json({ message: ["Login successful"], company })
            } else {
                return res.status(400).json({ message: ["Invalid credentials"] })
            }
        }
        return res.status(400).json({ message: ["Invalid credentials"] })
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

// verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: ["Invalid token"] })
            }
            next();
        })
    } else {
        return res.status(400).json({ message: ["Token not provided"] })
    }
}

// view profile
router.get("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const company = await Company.findById(id);
        if (company) {
            return res.status(200).json({ company })
        } else {
            return res.status(404).json({ message: ["Company not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

// update profile
router.put("/profile/:id", upload.single("photo"), async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone, address, website } = req.body;
        const photo = req.file?.filename;
        const company = await Company.findByIdAndUpdate(id, {
            name, email, phone, address, website, photo
        }, { new: true });
        if (company) {
            return res.status(200).json({ message: ["Company profile updated"], company })
        } else {
            return res.status(404).json({ message: ["Company not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

function initializeSeats(seat_capacity) {
    const seats = [];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F']; // Typical A320 configuration
    const rows = Math.ceil(seat_capacity / columns.length);

    for (let i = 1; i <= rows; i++) {
        columns.forEach(col => {
            if (seats.length < seat_capacity) {
                seats.push({ seat_number: `${i}${col}`, is_available: true });
            }
        });
    }
    return seats;
}

// add flight
router.post("/addflight/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { flight_name, flight_no, from_location, to_location, start_time, end_time, date, seat_type, seat_capacity, price } = req.body;

        const checkflight = await Flight.findOne({ flight_no: flight_no });
        if (checkflight) {
            return res.status(400).json({ message: ["Flight already exists"] });
        } else {
            const seats = initializeSeats(seat_capacity); // Initialize seats based on capacity

            const flight = await Flight.create({
                company_id: id,
                flight_name,
                flight_no,
                from_location,
                to_location,
                start_time,
                end_time,
                date,
                seat_type,
                seat_capacity,
                price,
                status: "active",
                seats // Save initialized seats
            });

            console.log(flight, "flight");
            if (flight) {
                return res.status(201).json({ message: ["Flight added successfully"] });
            } else {
                return res.status(400).json({ message: ["Flight not added"] });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: ["Internal server error"] });
    }
});

// view flight
router.get("/viewflight/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const flights = await Flight.find({ company_id: id });
        if (flights) {
            return res.status(200).json({ message: ["Flights found"], flights })
        } else {
            return res.status(404).json({ message: ["Flights not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

// update flight
router.put("/updateflight/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const flights = await Flight.findById(id);
        if (!flights) {
            return res.status(404).json({ message: ["Flight not found"] })
        }
        const { flight_name, flight_no, from_location, to_location, start_time, end_time, date, seat_type, seat_capacity, price, status, discountPrice } = req.body;

        const flight = await Flight.findByIdAndUpdate(id, {
            flight_name: flight_name || flights.flight_name,
            flight_no: flight_no || flights.flight_no,
            from_location: from_location || flights.from_location,
            to_location: to_location || flights.to_location,
            start_time: start_time || flights.start_time,
            end_time: end_time || flights.end_time,
            date: date || flights.date,
            seat_type: seat_type || flights.seat_type,
            seat_capacity: seat_capacity || flights.seat_capacity,
            price: price || flights.price,
            status: status || flights.status,
            discountPrice: discountPrice || discountPrice,
        }, { new: true });
        if (flight) {
            const message =
                price > discountPrice
                    ? `${flight_name} price has been reduced`
                    : `${flight_name} price has increased`;

            await Customer.updateMany(
                {},
                {
                    $push: {
                        Notification: {
                            message: message,
                            date: new Date(),
                        },
                    },
                }
            );
            return res.status(200).json({ message: ["Flight updated successfully"] })
        } else {
            return res.status(404).json({ message: ["Flight not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

// delete flight
router.delete("/deleteflight/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const flight = await Flight.findByIdAndDelete(id);
        if (flight) {
            return res.status(200).json({ message: ["Flight deleted successfully"] })
        } else {
            return res.status(404).json({ message: ["Flight not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

// view booking
router.get("/viewbooking/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const bookings = await Booking.aggregate([
            {
                '$lookup': {
                    'from': 'flights',
                    'localField': 'flight_id',
                    'foreignField': '_id',
                    'as': 'flight'
                }
            }, {
                '$match': {
                    'flight.company_id': new mongoose.Types.ObjectId(id)
                }
            }, {
                '$group': {
                    '_id': '$flight_id',
                    'flights': {
                        '$first': '$flight'
                    },
                    'booking': {
                        '$push': '$booking'
                    }
                }
            }, {
                '$project': {
                    'flights': 1,
                    'booking': 1
                }
            }
        ]);
        if (bookings) {
            return res.status(200).json({ message: ["Bookings found"], bookings })
        } else {
            return res.status(404).json({ message: ["Bookings not found"] })
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] })
    }
});

router.patch('/cancel/:flightId', async (req, res) => {
    const { flightId } = req.params;
    try {
        // Update all bookings with the given flight ID to 'flight cancelled'
        const bookings = await Booking.updateMany(
            { flight_id: flightId },
            { status: 'flight cancelled' }
        );

        // Update the specific flight status to 'cancelled'
        const flight = await Flight.findByIdAndUpdate(
            flightId,
            { status: 'cancelled' }
        );

        if (!bookings || !flight) {
            return res.status(404).json({ message: 'No bookings or flight found.' });
        }

        return res.status(200).json({ message: 'Bookings and flight cancelled successfully.' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// logout
router.get("/logout", async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: ["Logout successful"] })
})

export default router;
