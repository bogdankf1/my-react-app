import {
    GET_ACCESS, CANCEL_ACCESS, CREATE_ACCOUNT, CANCEL_STATUS
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
        default:
            return state
    }
}

export default authReducer