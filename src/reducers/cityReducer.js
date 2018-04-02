import {
    HIDE_CITIES,
    SUCCESS_CITIES,
    REQUEST_CITIES
} from './../constants/constants.js'

const cityReducer = (state = {}, action) => {
    switch(action.type) {
        case HIDE_CITIES:
        case SUCCESS_CITIES:
            return Object.assign({}, state, {
                cities:action.data
            })
        case REQUEST_CITIES:
            return Object.assign({}, state, {
                countryName:action.countryName
            })
        default:
            return state
    }
}

export default cityReducer