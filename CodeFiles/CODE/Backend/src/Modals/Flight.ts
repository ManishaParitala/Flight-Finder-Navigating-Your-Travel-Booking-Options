import mongoose from "mongoose";



export interface IFlight extends mongoose.Document {
    company_id: mongoose.Schema.Types.ObjectId;
    flight_name: string;
    flight_no: string;
    from_location: string;
    to_location: string;
    start_time: string;
    end_time: string;
    date: Date;
    seat_type: string;
    seat_capacity: number;
    price: number;
    status: string;
    createdAt: Date;
    discountPrice:String
};



const FlightSchema = new mongoose.Schema({
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    flight_name: { type: String, required: true },
    flight_no: { type: String, required: true,unique:true },
    from_location: { type: String, required: true },
    to_location: { type: String, required: true },
    start_time:{type:String,required:true},
    end_time:{type:String,required:true},
    date: { type: Date, required: true },
    seat_type:{type:String,required:true},
    seat_capacity:{type:Number,required:true},
    price:{type:Number,required:true},
    status:{type:String,required:true},
    createdAt: { type: Date, default: Date.now() },
    discountPrice:{type:String}
});


const Flight = mongoose.model<IFlight>("Flight", FlightSchema);

export default Flight;