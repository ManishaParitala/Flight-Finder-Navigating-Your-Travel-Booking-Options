import axios from 'axios';
import {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    viewprofileRequest,
    viewprofileSuccess,
    viewprofileFail,
    updateprofileRequest,
    updateprofileSuccess,
    updateprofileFail,
    searchflightRequest,
    searchflightSuccess,
    searchflightFail,
    bookflightRequest,
    bookflightSuccess,
    bookflightFail,
    viewbookingRequest,
    viewbookingSuccess,
    viewbookingFail,
    cancelbookingRequest,
    cancelbookingSuccess,
    cancelbookingFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    clearnotificationFali,
    clearnotificationRequset,
    clearnotificationSuccess,
    sendotpfailure,
    sendotprequest,
    sendotpsuccess,
    verifyotpFaliure,
    verifyotprequest,
    verifyotpsuccess,
    updatepasswordFailur,
    updatepasswordrequest,
    updatepasswordsuccess
} from '../Slice/Customer';

import { toast } from 'react-toastify';




// Register Customer
export const registerCustomer = (data) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const response = await axios.post('/api/customer/register', data);
        dispatch(registerSuccess(response.data));
       response.data.message.map((item)=>toast.success(item));
       setTimeout(() => {
         window.location.href = '/login';
       }, 3000);
    } catch (error) {
        dispatch(registerFail(error.response.data));
        toast.error(error.response.data);
    }
};


// Login Customer
export const loginCustomer = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axios.post('/api/customer/login', data);
        dispatch(loginSuccess(response.data));
        sessionStorage.setItem('customer', JSON.stringify(response.data.customer));
        response.data.message.map((item)=>toast.success(item));
        setTimeout(() => {
            window.location.href = '/homepage';
        }, 3000);

    } catch (error) {
        dispatch(loginFail(error.response.data));
        toast.error(error.response.data);
    }
};


// View Profile
export const viewProfile = (id) => async (dispatch) => {
    try {
        dispatch(viewprofileRequest());
        const response = await axios.get(`/api/customer/profile/${id}`);
        console.log(response.data,"profile response")
        // response.data.message.map((item)=>toast.success(item));
        dispatch(viewprofileSuccess(response.data));
    } catch (error) {
        console.log(error,"fgoir")
        dispatch(viewprofileFail(error.response));
        error.response.data.message.map((item)=>toast.error(item));
    }
};


// Update Profile
export const updateProfile = (id,data) => async (dispatch) => {
    try {
        dispatch(updateprofileRequest());
        const response = await axios.put(`/api/customer/changepassword/${id}`, data);
        dispatch(updateprofileSuccess(response.data));
        response.data.message.map((item)=>toast.success(item));
    } catch (error) {
        dispatch(updateprofileFail(error.response.data));
        error.response.data.message.map((item)=>toast.error(item));
    }
};


// Search Flight
export const searchFlight = () => async (dispatch) => {
    try {
        dispatch(searchflightRequest());
        const response = await axios.get('/api/customer/searchflight');
        response.data.message.map((item)=>toast.success(item));
        dispatch(searchflightSuccess(response.data));
    } catch (error) {
        dispatch(searchflightFail(error.response.data));
        error.response.data.message.map((item)=>toast.error(item));
    }
};



// Book Flight
export const bookFlight = (id,data) => async (dispatch) => {
    try {
        dispatch(bookflightRequest());
        const response = await axios.post(`/api/customer/flightbooking/${id}`, data);
        dispatch(bookflightSuccess(response.data));
        response.data.message.map((item)=>toast.success(item));
    } catch (error) {
        dispatch(bookflightFail(error.response.data));
        toast.error(error.response.data);
        error.response.data.message.map((item)=>toast.error(item));
    }
};




// View Booking
export const viewBooking = (id) => async (dispatch) => {
    try {
        dispatch(viewbookingRequest());
        const response = await axios.get(`/api/customer/viewbooking/${id}`);
        response.data.message.map((item)=>toast.success(item));
        dispatch(viewbookingSuccess(response.data));
    } catch (error) {
        dispatch(viewbookingFail(error.response.data));
        error.response.data.message.map((item)=>toast.error(item));
    }
};



// Cancel Booking
export const cancelBooking = (id) => async (dispatch) => {
    try {
        dispatch(cancelbookingRequest());
        const response = await axios.delete(`/api/customer/canclebooking/${id}`);
        dispatch(cancelbookingSuccess(response.data));
        toast.success('Booking Cancelled');
    } catch (error) {
        dispatch(cancelbookingFail(error.response.data));
        toast.error(error.response.data);
    }
};



// Logout Customer
export const logoutCustomer = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const response = await axios.get('/api/customer/logout');
        response.data.message.map((item)=>toast.success(item));
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data));
        error.response.data.message.map((item)=>toast.error(item));
    }
};




// clear notification
export const clearNotification = (id)=>async(dispatch)=>{
    try{
       dispatch( clearnotificationRequset())
       const res = await axios.delete(`/api/customer/clearnotification/${id}`)
       res.data.message((item)=>toast.success(item))
       dispatch(clearnotificationSuccess(res.data));
       

    }catch(error){
        console.log(error)
        dispatch(clearnotificationFali(error))
        error.response.data.message((item)=>toast.error(item))

    }
}







// send otp
export const sendotp = (email) => async(dispatch)=>{
    try{
        dispatch(sendotprequest())
        const res = await axios.put('/api/customer/sendotp',{email:email})
        dispatch(sendotpsuccess(res.data))
        res.data.message((item)=>toast.success(item))


    }catch(error){
        console.log(error)
        dispatch(sendotpfailure())
        error.response.data.message((item)=>toast.error(item))

    }
}



// verify otp
export const otpverifycation = (email,otp) =>async(dispatch) =>{
    try{
        dispatch(verifyotprequest())
        const res = await axios.post('/api/customer/verifyotp',{
            email:email,
            otp:otp
        });

        // res.data.message((item)=>toast.error(item));
        dispatch(verifyotpsuccess(res.data))
    }catch(error){
        console.log(error)
        // error.response.data.message((item)=>toast.error(item));
        dispatch(verifyotpFaliure())
    }
}


// password update
export const forgotpassword = (data) => async(dispatch)=>{
    try{
        dispatch(updatepasswordrequest())
        const res = await axios.put('/api/customer/passwordupdate',{
            email:data.email,
            password:data.password,
            conformpassword:data.conformpassword
        });

        res.data.message((item)=>toast.success(item))

        dispatch(updatepasswordsuccess(res.data));
        window.location.href = '/login'


    }catch(error){
        console.log(error)
        error.response.data.message((item)=>toast.error(item))
        dispatch(updatepasswordFailur(error))
    }
}





