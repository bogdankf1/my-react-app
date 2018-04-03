import {
    GET_ACCESS, 
    CANCEL_ACCESS,
    CREATE_ACCOUNT, 
    CANCEL_STATUS, 
    REQUEST_SEND_USER_DATA, 
    REQUEST_CREATE_USER_ACCOUNT, 
    SUCCESS_SEND_USER_DATA, 
    SUCCESS_CREATE_USER_ACCOUNT, 
    SET_CURRENT_USER
} from './../constants/constants.js'

const authReducer = (state = {}, action) => {
    switch(action.type) {
        case CANCEL_ACCESS:
        case GET_ACCESS:
            return Object.assign({}, state, {
                access:action.access
            })
        case CREATE_ACCOUNT:
        case CANCEL_STATUS: 
            return Object.assign({}, state, {
                status:action.status
            })
        case REQUEST_SEND_USER_DATA:
        case REQUEST_CREATE_USER_ACCOUNT:
            return Object.assign({}, state, {
                payload:action.payload
            })
        case SUCCESS_SEND_USER_DATA:
        case SUCCESS_CREATE_USER_ACCOUNT: 
            return Object.assign({}, state, {
                response:action.response
            })
        case SET_CURRENT_USER:
            return Object.assign({}, state, {
                user:action.user
            })
        default:
            return state
    }
}

export default authReducer