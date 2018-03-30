import { delay } from 'redux-saga'
import { call, put, all, 
        takeLatest, takeEvery } from 'redux-saga/effects'

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
    CANCEL_ACCESS,
    CANCEL_STATUS
} from './../constants/constants.js'

function* receiveCountries() {
    const countries = yield fetch(`http://127.0.0.1:3001/api/country/list`)
                            .then(response => response.json())
    yield put({type: RECEIVE_COUNTRIES, data:countries})
}
function* receiveCities(countryName) {
    const cities = yield fetch(`http://127.0.0.1:3001/api/city/list/${countryName}`)
                        .then(response => response.json())
    yield put({type: RECEIVE_CITIES, data:cities})
}
function* showPreloader() {
    yield put({type: SHOW_PRELOADER, visibility: true})
}
function* hidePreloader() {
    yield put({type: HIDE_PRELOADER, visibility: false})
}
function* showFoundCountries(foundCountries) {
    yield put({type: SHOW_FOUND_COUNTRIES, data: foundCountries})
}
function* showAllCountries(allCountries) {
    yield put({type: SHOW_ALL_COUNTRIES, data: allCountries})
}
function* hideCities() {
    yield put({type: HIDE_CITIES, data: []})
}
function* getAccess(userAccess) {
    yield put({type:GET_ACCESS, access: userAccess}) 
}
function* cancelAccess() {
    yield put({type:CANCEL_ACCESS, access: false})
}
function* createAccount() {
    yield put({type:CREATE_ACCOUNT, status: true})
}
function* cancelStatus() {
    yield put({type:CANCEL_STATUS, status: false})
}
function* sendUserData(userData) {
    const response = yield fetch(`http://127.0.0.1:3001/api/login`, {
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    //
}
function* createUserAccount(userData) {
    const jsonResponse = yield fetch(`http://127.0.0.1:3001/api/signup`, {
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
    .then(response => response.json())
    .then(jsonData => {
        if(jsonData.status) {
           createAccount()// not sure
        } else {
           cancelStatus()// not sure
        }
        return jsonData
    })
}

function* watchReceiveCountries() {
    // yield takeEvery(SHOW_PRELOADER, showPreloader)
    // yield takeLatest(RECEIVE_COUNTRIES, receiveCountries)
}
function* watchReceiveCities() {
    // yield takeLatest(RECEIVE_CITIES, receiveCities)
}
function* watchShowPreloader() {
    // yield takeEvery(SHOW_PRELOADER, showPreloader)
}
export default function* rootSaga() {
    yield([
        watchReceiveCountries(),
        // watchShowPreloader()
        // watchReceiveCities()
    ])
} 