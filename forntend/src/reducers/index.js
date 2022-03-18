import {loggedReducer, userSignUpReducer, currencyReducer, productReducer, editProductReducer, addTocartReducer}  from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    LoggedInUSer: loggedReducer,
    User: userSignUpReducer,
    Currency: currencyReducer,
    Products: productReducer,
    editProduct: editProductReducer,
    CartItem: addTocartReducer,
});

export default rootReducer;