import {
    SHOW_ALL_COUNTRIES, 
    SHOW_FOUND_COUNTRIES,
    SUCCESS_COUNTRIES
} from './../constants/constants.js'

const countryReducer = (state = {}, action) => {
    switch(action.type) {
        case SHOW_FOUND_COUNTRIES:
        case SHOW_ALL_COUNTRIES:
        case SUCCESS_COUNTRIES:
            return Object.assign({}, state, {
                countries:action.data
            })
        default:
            return state
    }
}

export default countryReducer