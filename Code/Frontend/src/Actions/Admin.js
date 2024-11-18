import axios from "axios";
import {
    loginRequest,
    loginSuccess,
    loginFail,
    viewCompanyRequest,
    viewCompanySuccess,
    viewCompanyFail,
    updateCompanyRequest,
    updateCompanySuccess,
    updateCompanyFail,
    viewCustomerRequest,
    viewCustomerSuccess,
    viewCustomerFail,
    viewflightRequest,
    viewflightSuccess,
    viewflightFail,
    logoutRequest,
    logoutSuccess,
    logoutFail
} from "../Slice/Admin";


import { toast } from "react-toastify";


// Login Admin
export const loginAdmin = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axios.post("/api/admin/login", data);
        dispatch(loginSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
        setTimeout(() => {
            window.location.href = "/adminpanel";
        }, 2000);
    } catch (error) {
        dispatch(loginFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// View Company
export const viewCompany = () => async (dispatch) => {
    try {
        dispatch(viewCompanyRequest());
        const response = await axios.get("/api/admin/viewcompany");
        response.data.message.map((item) => toast.success(item));
        dispatch(viewCompanySuccess(response.data));
    } catch (error) {
        dispatch(viewCompanyFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};



// Update Company
export const updateCompany = (id, data) => async (dispatch) => {
    try {
        dispatch(updateCompanyRequest());
        const response = await axios.put(`/api/admin/updatecompany/${id}`, data);
        dispatch(updateCompanySuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(updateCompanyFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// get the customers
export const viewCustomer = () => async (dispatch) => {
    try {
        dispatch(viewCustomerRequest());
        const response = await axios.get("/api/admin/viewcustomer");
        response.data.message.map((item) => toast.success(item));
        dispatch(viewCustomerSuccess(response.data));
    } catch (error) {
        dispatch(viewCustomerFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// View Flight
export const viewFlight = () => async (dispatch) => {
    try {
        dispatch(viewflightRequest());
        const response = await axios.get("/api/admin/viewflight");
        response.data.message.map((item) => toast.success(item));
        dispatch(viewflightSuccess(response.data));
    } catch (error) {
        dispatch(viewflightFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};


// Logout
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const response = await axios.get("/api/admin/logout");
        dispatch(logoutSuccess(response.data));
        response.data.message.map((item) => toast.success(item));
    } catch (error) {
        dispatch(logoutFail(error.response.data));
        error.response.data.message.map((item) => toast.error(item));
    }
};