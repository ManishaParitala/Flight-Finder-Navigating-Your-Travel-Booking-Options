import axios from "axios";
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
    addflightRequest,
    addflightSuccess,
    addflightFail,
    viewflightRequest,
    viewflightSuccess,
    viewflightFail,
    updateflightRequest,
    updateflightSuccess,
    updateflightFail,
    deleteflightRequest,
    deleteflightSuccess,
    deleteflightFail,
    viewbookingRequest,
    viewbookingSuccess,
    viewbookingFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
} from "../Slice/Company";

import { toast } from "react-toastify";



// Register Company
export const registerCompany = (data) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const response = await axios.post("/api/company/register", data);
        dispatch(registerSuccess(response.data));
        toast.success("Registration Successful");
    } catch (error) {
        dispatch(registerFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// Login Company
export const loginCompany = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axios.post("/api/company/login", data);
        dispatch(loginSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
        sessionStorage.setItem("company", JSON.stringify(response.data.company));
        setTimeout(()=>{
            window.location.href = "/company";
        },3000)
    } catch (error) {
        dispatch(loginFail(error));
        error.response.data?.message.map((item) => toast.error(item));
    }
};



// View Profile
export const viewProfile = (id) => async (dispatch) => {
    try {
        dispatch(viewprofileRequest());
        const response = await axios.get(`/api/company/profile/${id}`);
        response.data.message.map((item) => toast.success(item));
        dispatch(viewprofileSuccess(response.data));
    } catch (error) {
        dispatch(viewprofileFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// Update Profile
export const updateProfile = (id, data) => async (dispatch) => {
    try {
        dispatch(updateprofileRequest());
        const response = await axios.put(`/api/company/profile/${id}`, data);
        dispatch(updateprofileSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(updateprofileFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};




// Add Flight
export const addFlight = (data,companyid) => async (dispatch) => {
    try {
        dispatch(addflightRequest());
        const response = await axios.post(`/api/company/addflight/${companyid}`, data);
        dispatch(addflightSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(addflightFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// View Flight
export const viewFlight = (id) => async (dispatch) => {
    try {
        dispatch(viewflightRequest());
        const response = await axios.get(`/api/company/viewflight/${id}`);
        response.data.message.map((item) => toast.success(item));
        dispatch(viewflightSuccess(response.data));
    } catch (error) {
        dispatch(viewflightFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// Update Flight
export const updateFlight = (id, data) => async (dispatch) => {
    try {
        dispatch(updateflightRequest());
        const response = await axios.put(`/api/company/updateflight/${id}`, data);
        dispatch(updateflightSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(updateflightFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// Delete Flight
export const deleteFlight = (id) => async (dispatch) => {
    try {
        dispatch(deleteflightRequest());
        const response = await axios.delete(`/api/company/deleteflight/${id}`);
        dispatch(deleteflightSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(deleteflightFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// View Booking
export const viewBooking = (id) => async (dispatch) => {
    try {
        dispatch(viewbookingRequest());
        const response = await axios.get(`/api/company/viewbooking/${id}`);
        response.data.message.map((item) => toast.success(item));
        dispatch(viewbookingSuccess(response.data));
    } catch (error) {
        dispatch(viewbookingFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// Logout
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const response = await axios.get("/api/company/logout");
        dispatch(logoutSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(logoutFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};