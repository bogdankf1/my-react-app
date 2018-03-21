import {
    LOAD_COUNTRIES,
    SHOW_ALL_COUNTRIES, 
    SHOW_FOUND_COUNTRIES
} from './../constants/constants.js'

const countryReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_COUNTRIES:
        case SHOW_FOUND_COUNTRIES:
        case SHOW_ALL_COUNTRIES:
            return Object.assign({}, state, {
                countries:action.data
            })
        default:
            return state
    }
}

export default countryReducer