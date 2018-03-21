import {
    SHOW_PRELOADER,
    HIDE_PRELOADER,
} from './../constants/constants.js'

const preloaderReducer = (state = {}, action) => {
    switch(action.type) {
        case SHOW_PRELOADER:
        case HIDE_PRELOADER:
            return Object.assign({}, state, {
                showPreloader:action.visibility
            })
        default:
            return state
    }
}

export default preloaderReducer