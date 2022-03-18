import {loggedReducer, userSignUpReducer, currencyReducer, productReducer, editProductReducer}  from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    LoggedInUSer: loggedReducer,
    User: userSignUpReducer,
    Currency: currencyReducer,
    Products: productReducer,
    editProduct: editProductReducer,
});

export default rootReducer;