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