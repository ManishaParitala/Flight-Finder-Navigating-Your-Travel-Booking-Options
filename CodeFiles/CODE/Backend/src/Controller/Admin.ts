import { Router } from "express";
import mongoose from "mongoose";
import Company from "../Modals/Company";
import Customer from "../Modals/Customer";
import Flight from "../Modals/Flight";
import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";




// routes
const router = Router();


// login
router.post("/login",async(req:Request,res:any,next:NextFunction)=>{
    try{
        const {email,password} = req.body;
        if(email === "admin@gmail.com" && password === "admin"){
        const token = jwt.sign({email:email},"secret",{expiresIn:"1h"});
        res.cookie("token",token,{httpOnly:true});
        return res.status(200).json({message:["Login successful"]})
        }else{
            return res.status(400).json({message:["Invalid credentials"]})
        }
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    };
});


const verifyToken = (req:Request,res:any,next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:["Unauthorized"]});
    }
    jwt.verify(token,"secret",(err:any,decoded:any)=>{
        if(err){
            return res.status(401).json({message:["Unauthorized"]});
        }
        req.body.customer = decoded;
        next();
    }
    );
}



// get the company
router.get("/viewcompany",async(req:Request,res:any,next:NextFunction)=>{
    try{
        const company = await Company.find();
        return res.status(200).json({message:["Company list"],company})
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    }
});



// update status of company
router.put("/updatecompany/:id",async(req:Request,res:any,next:NextFunction)=>{
    try{
        const id = req.params.id;
        const status = req.body.status;
        const company = await Company.findByIdAndUpdate(id,{status:status});
        return res.status(200).json({message:["Company status updated"],company})
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    }
});



// get the customer
router.get("/viewcustomer",async(req:Request,res:any,next:NextFunction)=>{
    try{
        const customer = await Customer.find();
        return res.status(200).json({message:["Customer list"],customer})
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    }
});


// get the flight
router.get("/viewflight",async(req:Request,res:any,next:NextFunction)=>{
    try{
        const flight = await Flight.find();
        return res.status(200).json({message:["Flight list"],flight})
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    }
});


// logout
router.get("/logout",async(req:Request,res:any,next:NextFunction)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:["Logout successful"]})
    }catch(err){
        return res.status(500).json({message:["Internal server error"]})
    }
});



export default router;