import {
    LOAD_COUNTRIES,
    LOAD_CITIES,
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    SHOW_ALL_COUNTRIES, 
    SHOW_FOUND_COUNTRIES
} from './../constants/constants.js'

/*
* ACTION СREATORS
*/
export const loadCountries = (loadedCountries) => {
    return {
        type: LOAD_COUNTRIES,
        data: loadedCountries
    }
}
export const loadCities = (loadedCities) => {
    return {
        type: LOAD_CITIES,
        data: loadedCities
    }
}
export const showPreloader = () => {
    return {
        type: SHOW_PRELOADER,
        visibility: true
    }
}
export const hidePreloader = () => {
    return {
        type: HIDE_PRELOADER,
        visibility: false
    }
}
export const showFoundCountries = (foundCountries) => {
    return {
        type: SHOW_FOUND_COUNTRIES,
        data: foundCountries
    }
}
export const showAllCountries = (allCountries) => {
    return {
        type: SHOW_ALL_COUNTRIES,
        data: allCountries
    }
}