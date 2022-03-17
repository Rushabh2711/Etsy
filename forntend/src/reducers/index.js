import {loggedReducer, userSignUpReducer, currencyReducer, productReducer}  from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    LoggedInUSer: loggedReducer,
    User: userSignUpReducer,
    Currency: currencyReducer,
    Products: productReducer,
});

export default rootReducer;