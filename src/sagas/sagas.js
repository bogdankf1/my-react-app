import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
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

export default function* rootSaga() {
    yield([

    ])
} 