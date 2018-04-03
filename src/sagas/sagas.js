import { put, all, takeLatest } from 'redux-saga/effects'

import {
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    GET_ACCESS,
    CREATE_ACCOUNT,
    CANCEL_ACCESS,
    CANCEL_STATUS,
    REQUEST_COUNTRIES,
    SUCCESS_COUNTRIES,
    SUCCESS_CITIES,
    REQUEST_CITIES,
    REQUEST_SEND_USER_DATA,
    SUCCESS_SEND_USER_DATA,
    SUCCESS_CREATE_USER_ACCOUNT,
    REQUEST_CREATE_USER_ACCOUNT,
    SET_CURRENT_USER
} from './../constants/constants.js'
import {authentication} from './../components/Login'
function* sendUserData(action) {
    const jsonResponse = yield fetch(`http://127.0.0.1:3001/api/login`, {
        body: JSON.stringify(action.payload),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    if(jsonResponse.access) {
        console.log(jsonResponse)
        // this.props.store.currentUser = user
        authentication.authenticate()
        yield put({type:SET_CURRENT_USER, user:action.payload})
        yield put({type:GET_ACCESS, access:jsonResponse})
      } else {
        document.getElementById("fail-login-status").innerHTML = ""
        const status = document.createTextNode("Login or password is incorrect!")
        document.getElementById("fail-login-status").appendChild(status)
      }
    yield put({type:SUCCESS_SEND_USER_DATA, response:jsonResponse})
}

function* createUserAccount(action) {
    const jsonResponse = yield fetch(`http://127.0.0.1:3001/api/signup`, {
        body: JSON.stringify(action.payload),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    if(jsonResponse) {
        yield put({type:CREATE_ACCOUNT, status:true})
    } else {
        yield put({type:CANCEL_STATUS, status:false})
        document.getElementById('username-status').innerHTML = ""
        const error = document.createTextNode(`Account with such email is already exist!`)
        document.getElementById('username-status').appendChild(error)
    }
    yield put({type:SUCCESS_CREATE_USER_ACCOUNT, response:jsonResponse})
}

function* receiveCountries() {
    const countries = yield fetch(`http://127.0.0.1:3001/api/country/list`)
                            .then(response => response.json())
    yield put({type:SUCCESS_COUNTRIES, data:countries})
    yield put({type:HIDE_PRELOADER, visibility:false})
}
function* receiveCities(action) {
    const cities = yield fetch(`http://127.0.0.1:3001/api/city/list/${action.countryName}`)
                        .then(response => response.json())
    yield put({type:SUCCESS_CITIES, data:cities})
}
function* watchReceiveCities() {
    yield takeLatest(REQUEST_CITIES, receiveCities)
}
function* watchReceiveCountries() {
    yield takeLatest(REQUEST_COUNTRIES, receiveCountries)
    yield put({type:SHOW_PRELOADER, visibility:true})
}
function* watchSendUserData() {
    yield takeLatest(REQUEST_SEND_USER_DATA, sendUserData)
}
function* watchCreateUserAccount() {
    yield takeLatest(REQUEST_CREATE_USER_ACCOUNT, createUserAccount)
}
export default function* rootSaga() {
    yield all([
        watchReceiveCountries(),
        watchReceiveCities(),
        watchSendUserData(),
        watchCreateUserAccount()
    ])
} 