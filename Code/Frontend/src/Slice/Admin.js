import { createSlice } from "@reduxjs/toolkit";



const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
    },
    reducers: {
        loginRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        loginSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        loginFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewCompanyRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewCompanySuccess: (state,actions) => {
            return {
                ...state,
                loading: false,
                company: actions.payload.company,
            };
        },
        viewCompanyFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateCompanyRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        updateCompanySuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateCompanyFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewCustomerRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewCustomerSuccess: (state,actions) => {
            return {
                ...state,
                loading: false,
                customers: actions.payload.customer,
            };
        },
        viewCustomerFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewflightSuccess: (state,actions) => {
            console.log(actions.payload.flight);
            return {
                ...state,
                loading: false,
                flights: actions.payload.flight,
            };
        },
        viewflightFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        logoutRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        logoutSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        logoutFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
    }
});


const { reducer, actions } = adminSlice;

export const {
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
    logoutFail,
} = actions;


export default reducer;