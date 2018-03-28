import {
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    SHOW_ALL_COUNTRIES, 
    SHOW_FOUND_COUNTRIES,
    RECEIVE_COUNTRIES,
    RECEIVE_CITIES,
    HIDE_CITIES,
    GET_ACCESS,
    CREATE_ACCOUNT,
    AVAILABLE_SIGN_UP, 
    UNAVAILABLE_SIGN_UP,
    CANCEL_ACCESS,
    CANCEL_STATUS,
    AVAILABLE_LOGIN,
    UNAVAILABLE_LOGIN
} from './../constants/constants.js'

/*
* ACTION СREATORS
*/
// Preloader
export const showPreloader = () => {
    return {
        type: SHOW_PRELOADER,
        visibility: true
    }
}
export const hidePreloader = () => {
    return {
        type: HIDE_PRELOADER,
        visibility: false
    }
}
// Countries
export const showFoundCountries = (foundCountries) => {
    return {
        type: SHOW_FOUND_COUNTRIES,
        data: foundCountries
    }
}
export const showAllCountries = (allCountries) => {
    return {
        type: SHOW_ALL_COUNTRIES,
        data: allCountries
    }
}
const receiveCountries = (jsonData) => {
    return {
        type: RECEIVE_COUNTRIES,
        data: jsonData
    }
}
// Cities
export const hideCities = () => {
    return {
        type: HIDE_CITIES,
        data: []
    }
}
const receiveCities = (countryName, jsonData) => {
    return {
        type: RECEIVE_CITIES,
        countryName,
        data: jsonData
    }
}

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
const createAccount = (accountStatus) => {
    return {
        type:CREATE_ACCOUNT,
        status: accountStatus
    }
}
export const cancelStatus = () => {
    return {
        type:CANCEL_STATUS,
        status: false
    }
}

export const availableSignUp = () => {
    return {
        type: AVAILABLE_SIGN_UP,
        availableSignUp: true
    }
}
export const unavailableSignUp = () => {
    return {
        type: UNAVAILABLE_SIGN_UP,
        availableSignUp: false
    }
}
export const availableLogin = () => {
    return {
        type: AVAILABLE_LOGIN,
        availableLogin: true
    }
}
export const unavailableLogin = () => {
    return {
        type: UNAVAILABLE_LOGIN,
        availableLogin: false
    }
}

//ASYNC ACTION CREATORS
export const fetchCountries = () => {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/api/country/list`)
            .then(response => response.json())
            .then(jsonData => dispatch(receiveCountries(jsonData)))
    }
}

export const fetchCities = (countryName) => {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/api/city/list/${countryName}`)
            .then(response => response.json())
            .then(jsonData => dispatch(receiveCities(countryName, jsonData)))
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
            .then(jsonData => dispatch(createAccount(jsonData.status)))
    }
}