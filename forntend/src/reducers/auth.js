export const loggedReducer = (state = 0, action) => {
    switch (action.type){
        case 'SIGNIN':
            return action.payload
        case 'LOGOUT':
            return 0;
        default: 
            return state;
    }
};

export const userSignUpReducer = (state = {}, action) => {
    switch (action.type){
        case 'USERLOGIN':
            return action.payload;
        default: 
            return state;
    }
};

export const currencyReducer = (state = "$", action) => {
    switch (action.type){
        case 'CURRENCY':
            return action.payload;
        default: 
            return state;
    }
};

export const productReducer = (state = [], action) => {
    switch (action.type){
        case 'PRODUCT':
            return action.payload;
        default: 
            return state;
    }
};

export const editProductReducer = (state = {}, action) => {
    switch (action.type){
        case 'EDITPRODUCT':
            return action.payload;
        default: 
            return state;
    }
};