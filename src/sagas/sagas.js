import { put, fork, takeLatest, take } from 'redux-saga/effects'

import {
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    GET_ACCESS,
    CREATE_ACCOUNT,
    CANCEL_STATUS,
    REQUEST_COUNTRIES,
    SUCCESS_COUNTRIES,
    SUCCESS_CITIES,
    REQUEST_CITIES,
    REQUEST_SEND_USER_DATA,
    REQUEST_CREATE_USER_ACCOUNT,
    SET_CURRENT_USER,
    INCORRECT_LOGIN_OR_PASSWORD,
    USERNAME_IS_ALREADY_TAKEN,
    LOGIN_AND_PASSWORD_ARE_CORRECT
} from './../constants/constants.js'
import {authentication} from './../components/Login'

//Authentication
function* sendUserData(action) {
    const jsonResponse = yield fetch(`http://127.0.0.1:3001/api/login`, {
        body: JSON.stringify(action.payload),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    if(jsonResponse.access) {
        authentication.authenticate()
        yield put({type:SET_CURRENT_USER, user:action.payload})
        yield put({type:GET_ACCESS, access:jsonResponse})
    } else {
        yield put({type:INCORRECT_LOGIN_OR_PASSWORD})
    }
}

function* createUserAccount(action) {
    const jsonResponse = yield fetch(`http://127.0.0.1:3001/api/signup`, {
        body: JSON.stringify(action.payload),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    if(jsonResponse.signUpStatus) {
        yield put({type:CREATE_ACCOUNT, status:true})
    } else {
        yield put({type:CANCEL_STATUS, status:false})
        yield put({type:USERNAME_IS_ALREADY_TAKEN})
    }
}

//Fetch countries from server
function* receiveCountries() {
    yield put({type:SHOW_PRELOADER})
    const countries = yield fetch(`http://127.0.0.1:3001/api/country/list`)
                            .then(response => response.json())
    yield put({type:SUCCESS_COUNTRIES, data:countries})
    yield put({type:HIDE_PRELOADER})
}

//Fetch cities from server
function* receiveCities(action) {
    yield put({type:SHOW_PRELOADER})
    const cities = yield fetch(`http://127.0.0.1:3001/api/city/list/${action.countryName}`)
                        .then(response => response.json())
    yield put({type:SUCCESS_CITIES, data:cities})
    yield put({type:HIDE_PRELOADER})
}

//Export root saga that consists all sagas 
export default function* rootSaga() {
    yield fork(takeLatest, REQUEST_COUNTRIES, receiveCountries)
    yield fork(takeLatest, REQUEST_CITIES, receiveCities)
    yield fork(takeLatest, REQUEST_SEND_USER_DATA, sendUserData)
    yield fork(takeLatest, REQUEST_CREATE_USER_ACCOUNT, createUserAccount)
}