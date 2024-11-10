import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Customer from "../Modals/Customer";
import path from "path";
import fs from "fs";
import multer from "multer";
import jwt from "jsonwebtoken";
import Flight from "../Modals/Flight";
import { IFlight } from "../Modals/Flight";
import Booking from "../Modals/Booking";
import { IBooking } from "../Modals/Booking";
import mongoose from "mongoose";
import { SendForgotPassword } from './Sendmail';
import { SendOrderConfirm } from "./Sendmail";


// routes
const router = Router();



// multer storage
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        const uploadPath = path.join(__dirname, "../uploads/customers");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath)
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
});



// multer file filter
const fileFilter = (req: Request, file: any, cb: any) => {
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



// register customer
router.post("/register", upload.single("photo"), async (req: Request, res: any, next: NextFunction) => {
    try {
        const { name, email, phone, password, address } = req.body;
        const photo = req.file?.filename;
        const checkemail = await Customer.findOne({ email: email });
        if (checkemail) {
            return res.status(400).json({ message: ["Email already exists"] })
        } else {
            const NewCustomer = await Customer.create({
                name,
                email,
                phone,
                password,
                address,
                photo
            });
            if (NewCustomer) {
                return res.status(201).json({ message: ["Customer created successfully"] })
            } else {
                return res.status(400).json({ message: ["Customer not created"] })
            }
        }


    } catch (err) {
        next(err)
        console.log(err)
        return res.status(500).json({ message: ["Internal server error"] });
    }
});




// login customer
router.post("/login", async (req: Request, res: any, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const customer = await Customer.findOne({ email: email });
        console.log(customer)
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
    const otp = Math.floor(Math.random() * 1000)

    return otp.toString().padStart(4, '7')
}


// forgot password
router.put("/sendotp", async (req: Request, res: any, next: NextFunction) => {
    try {
        const { email } = req.body;

        const user = await Customer.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ["No user found with these mail"]
            })
        } else {

            const otp = generateotp();

            const updateotp = await Customer.findByIdAndUpdate(user._id, {
                otp: otp
            });

            if (updateotp) {
                SendForgotPassword(email, otp);
                return res.status(200).json({
                    success: true,
                    message: ["otp send successfully"]
                })
            }

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        })
    }
});




// verify otp
router.post('/verifyotp', async (req: Request, res: any, next: NextFunction) => {
    try {
        const { email, otp } = req.body;

        const User = await Customer.findOne({ email: email, otp: otp });

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "Invalid otp"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Otp verify successfully"
            })

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});




// update password
router.put('/passwordupdate', async (req: Request, res: any, next: NextFunction) => {
    try {
        const { email, password, conformpassword } = req.body;

        const user = await Customer.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with these id"
            })
        } else {
            const updateuser = await Customer.findByIdAndUpdate(user._id, {
                password: password
            }, { new: true });

            if (updateuser) {
                return res.status(200).json({
                    success: true,
                    message: "Password update sucessfully"
                })
            }
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})





const verifyToken = (req: Request, res: any, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: ["Unauthorized"] });
    }
    jwt.verify(token, "secret", (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: ["Unauthorized"] });
        }
        req.body.customer = decoded;
        next();
    });
};



// view profile
router.get("/profile/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);
        if (customer) {
            return res.status(200).json({ customer });
        } else {
            return res.status(404).json({ message: ["Customer not found"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});




// update profile
router.put("/profile/:id", verifyToken, upload.single("photo"), async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name, email, phone, address } = req.body;
        const photo = req.file?.filename;
        const customer = await Customer.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            address,
            photo
        }, { new: true });
        if (customer) {
            return res.status(200).json({ message: ["Profile updated successfully"] });
        } else {
            return res.status(400).json({ message: ["Profile not updated"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});






// get flight 
router.get("/searchflight", async (req: Request, res: any, next: NextFunction) => {
    try {

        const flight = await Flight.find();
        if (flight) {
            return res.status(200).json({ message: ["Flight  found"], flight });
        } else {
            return res.status(404).json({ message: ["Flight not found"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});

router.post("/flightbooking/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { email, mobile, flight_id, booking_date, booking } = req.body;

        const flight = await Flight.findById(flight_id);
        if (!flight) {
            return res.status(404).json({ message: ["Flight not found"] });
        }

        // Check if selected seats are available
        const selectedSeats = booking.map((passenger: any) => passenger.seat_no);
        const unavailableSeats = flight.seats.filter(seat =>
            selectedSeats.includes(seat.seat_number) && !seat.is_available
        );

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: ["One or more selected seats are not available"] });
        }

        // Mark selected seats as unavailable
        flight.seats.forEach(seat => {
            if (selectedSeats.includes(seat.seat_number)) {
                seat.is_available = false;
            }
        });

        const totalPrice = flight.price * booking.length;

        const newBooking = new Booking({
            email,
            mobile,
            flight_id,
            customer_id: id,
            booking_date: new Date(booking_date),
            no_of_seats: booking.length,
            booking,
            price: totalPrice,
            status: "booked"
        });

        await newBooking.save();

        // Update flight with new seat availability
        await Flight.findByIdAndUpdate(flight_id, { seats: flight.seats });

        const user = await Customer.findById(id);

        const orderDetails = {
            flightName: flight.flight_name,
            flightNumber: flight.flight_no,
            from: flight.from_location,
            to: flight.to_location,
            date: flight.date,
            totalPrice: newBooking.price
        };

        if (newBooking) {
            SendOrderConfirm(user?.email, orderDetails);
            return res.status(201).json({ message: ["Flight booked successfully"], booking: newBooking });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: ["Internal server error"] });
    }
});


// get the bookings of a customer
router.get("/viewbooking/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const bookings = await Booking.aggregate([
            {
                '$match': {
                    'customer_id': new mongoose.Types.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'flights',
                    'localField': 'flight_id',
                    'foreignField': '_id',
                    'as': 'flight'
                }
            }
        ]);
        if (bookings.length > 0) {
            return res.status(200).json({
                message: [],
                bookings
            });
        } else {
            return res.status(404).json({ message: ["Bookings not found"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});

// cancel a booking
router.delete("/canclebooking/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const booking: any = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: ["Booking not found"] });
        } else {
            // Get the flight id and booked seats
            const flightId = booking.flight_id;
            const bookedSeats = booking.booking.map((b: any) => b.seat_no);

            // Delete the booking
            const deletedBooking = await Booking.findByIdAndDelete(id);
            if (deletedBooking) {
                // Update seat availability in the flight document
                await Flight.findByIdAndUpdate(
                    flightId,
                    {
                        $inc: { seat_capacity: bookedSeats.length },
                        $set: { "seats.$[elem].is_available": true }
                    },
                    {
                        arrayFilters: [{ "elem.seat_number": { $in: bookedSeats } }],
                        multi: true
                    }
                );

                console.log('Deleted Booking:', deletedBooking);
                return res.status(200).json({ message: ["Booking cancelled successfully"] });
            }
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: ["Internal server error"] });
    }
});


// change paswword
router.put("/changepassword/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { oldpassword, newpassword } = req.body;
        const customer = await Customer.findById(id);
        if (customer) {
            if (customer.password === oldpassword) {
                const updatedCustomer = await Customer.findByIdAndUpdate(id, { password: newpassword }, { new: true });
                if (updatedCustomer) {
                    return res.status(200).json({ message: ["Password updated successfully"] });
                } else {
                    return res.status(400).json({ message: ["Password not updated"] });
                }
            } else {
                return res.status(400).json({ message: ["Invalid old password"] });
            }
        } else {
            return res.status(404).json({ message: ["Customer not found"] });
        }
    } catch (err) {
        return res.status(500).json({ message: ["Internal server error"] });
    }
});



// clear notification
router.delete("/clearnotification/:id", async (req: Request, res: any, next: NextFunction) => {
    try {
        const id: string = req.params.id as string;

        const user = await Customer.findById(id)

        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ["No customer found with these id"]
            })
        } else {
            const update = await Customer.findByIdAndUpdate(id, {
                $set: {
                    Notification: []
                }
            }, { new: true });

            if (update) {
                return res.status(200).json({
                    success: true,
                    message: ["notification clear successfully"]
                })
            }

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        })
    }

});



// 







// logout customer
router.get("/logout", async (req: Request, res: any, next: NextFunction) => {
    res.clearCookie("token");
    return res.status(200).json({ message: ["Logout successful"] });
});





export default router;





