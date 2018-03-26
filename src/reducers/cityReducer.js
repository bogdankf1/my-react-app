import {
    RECEIVE_CITIES,
    HIDE_CITIES
} from './../constants/constants.js'

const cityReducer = (state = {}, action) => {
    switch(action.type) {
        case HIDE_CITIES:
        case RECEIVE_CITIES:
            return Object.assign({}, state, {
                cities:action.data
            })
        default:
            return state
    }
}

export default cityReducer