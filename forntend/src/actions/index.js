export const signin = (userid) => {
    return {
        type: 'SIGNIN',
        payload: userid
    }
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
};

export const userLogin = (data) => {
    return {
        type: 'USERLOGIN',
        payload : data
    }
};

export const currency = (data) => {
    return {
        type: 'CURRENCY',
        payload : data
    }
};

export const product = (data) => {
    return {
        type: 'PRODUCT',
        payload : data
    }
};

export const editProduct = (data) => {
    return {
        type: 'EDITPRODUCT',
        payload : data
    }
};

export const addToCart = (data) => {
    return {
        type: 'ADDTOCART',
        payload : data
    }
};

export const remeveFromCart = (data) => {
    return {
        type: 'REMOVECART',
        payload : data
    }
};

export const clearCart = () => {
    return {
        type: 'CLEARCART',
    }
};

export const searchItem = (data) => {
    return {
        type: 'SEARCH',
        payload : data
    }
};

// export const ShopDetails = (data) => {
//     return {
//         type: 'SHOP',
//         payload : data
//     }
// };