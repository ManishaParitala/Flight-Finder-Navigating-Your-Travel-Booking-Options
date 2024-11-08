import mongoose from "mongoose";


export interface ICompany extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    photo: string;
    website: string;
    status: string;
    createdAt: Date;
};




const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    phone: { type: String, required: true },
    password:{type:String,required:true},
    address:{type:String,required:true},
    photo:{type:String,required:true},
    website:{type:String,required:true},
    status:{type:String,required:true},
    createdAt: { type: Date, default: Date.now() },

});



const Company = mongoose.model<ICompany>("Company", CompanySchema);

export default Company;