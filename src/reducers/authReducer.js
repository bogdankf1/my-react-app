import {
    GET_ACCESS, CREATE_ACCOUNT,
    AVAILABLE_SIGN_UP, UNAVAILABLE_SIGN_UP
} from './../constants/constants.js'

const authReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ACCESS:
            return Object.assign({}, state, {
                access:action.access
            })
        case CREATE_ACCOUNT: {
            return Object.assign({}, state, {
                status:action.status
            })
        }
        case AVAILABLE_SIGN_UP:
        case UNAVAILABLE_SIGN_UP: {
            return Object.assign({}, state, {
                available:action.available
            })
        }
        default:
            return state
    }
}

export default authReducer