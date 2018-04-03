import {
    SHOW_PRELOADER,
    HIDE_PRELOADER,
} from './../constants/constants.js'

const preloaderReducer = (state = {}, action) => {
    switch(action.type) {
        case SHOW_PRELOADER:
            return Object.assign({}, state, {
                visibility:true
            })
        case HIDE_PRELOADER:
            return Object.assign({}, state, {
                visibility:false
            })
        default:
            return state
    }
}

export default preloaderReducer