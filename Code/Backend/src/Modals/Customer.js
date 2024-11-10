import mongoose from "mongoose";



export interface ICustomer extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    photo: string;
    createdAt: Date;
    notification:string[];
    otp:number
};


const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    phone: { type: String, required: true },
    password:{type:String,required:true},
    address: { type: String, required: true },
    photo:{type:String, required:true},
    createdAt: { type: Date, default: Date.now() },
    Notification:[
        {
            message:String
        }
    ],
    otp:Number
});


const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;