import {
    GET_ACCESS,
    CREATE_ACCOUNT,
    CANCEL_ACCESS,
    CANCEL_STATUS,
} from './../constants/constants.js'


export const getAccess = (userAccess) => {
    return {
        type:GET_ACCESS,
        access: userAccess
    }
}
export const cancelAccess = () => {
    return {
        type:CANCEL_ACCESS,
        access: false
    }
}
const createAccount = () => {
    return {
        type:CREATE_ACCOUNT,
        status: true
    }
}
export const cancelStatus = () => {
    return {
        type:CANCEL_STATUS,
        status: false
    }
}

export const sendUserData = (userData) => {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/api/login`, {
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
                method: "POST"
            })
            .then(response => response.json())
    }
}

export const createUserAccount = (userData) => {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/api/signup`, {
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
                method: "POST"
            })
            .then(response => response.json())
            .then(jsonData => {
                if(jsonData.signUpStatus) {
                    dispatch(createAccount())
                } else {
                    dispatch(cancelStatus())
                }
                return jsonData
            })
    }
}