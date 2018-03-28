import {
    GET_ACCESS, CANCEL_ACCESS, CREATE_ACCOUNT,
    AVAILABLE_SIGN_UP, UNAVAILABLE_SIGN_UP, AVAILABLE_LOGIN, UNAVAILABLE_LOGIN, CANCEL_STATUS
} from './../constants/constants.js'

const authReducer = (state = {}, action) => {
    switch(action.type) {
        case CANCEL_ACCESS:
        case GET_ACCESS:
            return Object.assign({}, state, {
                access:action.access
            })
        case CREATE_ACCOUNT:
        case CANCEL_STATUS: {
            return Object.assign({}, state, {
                status:action.status
            })
        }
        case AVAILABLE_SIGN_UP:
        case UNAVAILABLE_SIGN_UP: {
            return Object.assign({}, state, {
                availableSignUp:action.availableSignUp
            })
        }
        case AVAILABLE_LOGIN:
        case UNAVAILABLE_LOGIN:
            return Object.assign({}, state, {
                availableLogin:action.availableLogin
            })
        default:
            return state
    }
}

export default authReducer