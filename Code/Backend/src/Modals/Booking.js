import mongoose from "mongoose";



export interface IBooking extends mongoose.Document {
    flight_id: mongoose.Schema.Types.ObjectId;
    customer_id: mongoose.Schema.Types.ObjectId;
    booking_date: Date;
    no_of_seats: number;
    passenger_name: string;
    seat_no: string;
    passenger_age: number;
    price: number;
    status: string;
    email: string;
    mobile: string;
    createdAt: Date;
};

const BookingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    flight_id: { type: mongoose.Schema.Types.ObjectId,ref:'Flight', required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId,ref:'Customer', required: true },
    booking_date: { type: Date, required: true },
    no_of_seats: { type: Number, required: true },
    booking:[
        {
            passenger_name:{type:String,required:true},
            seat_no:{type:String,required:true},
            passenger_age:{type:Number,required:true}
        }
    ],
    price: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});


const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;