import { combineReducers, configureStore } from "@reduxjs/toolkit";
import admin from "./Slice/Admin";
import company from "./Slice/Company";
import customer from "./Slice/Customer";

const rootReducer = combineReducers({
    admin,
    company,
    customer,
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;


// CompanyHomePage