import { createSlice } from "@reduxjs/toolkit";



const companySlice = createSlice({
    name: "company",
    initialState: {
        loading: false,
    },
    reducers:{
        registerRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        registerSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        registerFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
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
        viewprofileRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewprofileSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewprofileFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateprofileRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        updateprofileSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateprofileFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        addflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        addflightSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        addflightFail: (state) => {
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
            return {
                ...state,
                loading: false,
                flight: actions.payload.flights,
            };
        },
        viewflightFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        updateflightSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updateflightFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        deleteflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        deleteflightSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        deleteflightFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewbookingRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewbookingSuccess: (state,actions) => {
            // console.log(actions.payload.bookings,'bookingssss');
            return {
                ...state,
                loading: false,
                bookings: actions.payload.bookings,
            };
        },
        viewbookingFail: (state) => {
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



const { reducer, actions } = companySlice;

export const {
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
} = actions;

export default reducer;