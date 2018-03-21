import {
    LOAD_CITIES
} from './../constants/constants.js'

const cityReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_CITIES:
            return Object.assign({}, state, {
                cities:action.data
            })
        default:
            return state
    }
}

export default cityReducer