import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        loading: false,
    },
    reducers: {
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
        viewprofileSuccess: (state, actions) => {
            console.log(actions.payload, "paabvb")
            return {
                ...state,
                loading: false,
                profile: actions.payload.customer
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
        searchflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        searchflightSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                flight: actions.payload.flight,
            };
        },
        searchflightFail: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        bookflightRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        bookflightSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        bookflightFail: (state) => {
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
        viewbookingSuccess: (state, actions) => {
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
        cancelbookingRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        cancelbookingSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        cancelbookingFail: (state) => {
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
        clearnotificationRequset: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        clearnotificationSuccess: (state) => {
            return {
                ...state,
                loading: false
            }
        },
        clearnotificationFali: (state) => {
            return {
                ...state,
                loading: false
            }
        },
        sendotprequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        sendotpsuccess: (state, actions) => {
            return {
                ...state,
                loading: false
            }
        },
        sendotpfailure: (state) => {
            return {
                ...state,
                loading: false
            }
        },
        verifyotprequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        verifyotpsuccess: (state, actions) => {
            console.log(actions.payload, "vnofn")
            return {
                ...state,
                loading: false,
                success: actions.payload.success
            }
        },
        verifyotpFaliure: (state, actions) => {
            return {
                ...state,
                loading: false,
                success: actions.payload.success
            }
        },
        updatepasswordrequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        updatepasswordsuccess: (state) => {
            return {
                ...state,
                loading: false
            }
        },
        updatepasswordFailur: (state) => {
            return {
                ...state,
                loading: false
            }
        }
    },
});



const { reducer, actions } = customerSlice;


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
} = actions;



export default reducer;