import { combineReducers } from 'redux'
import countryReducer from './countryReducer.js'
import cityReducer from './cityReducer.js'
import preloaderReducer from './preloaderReducer.js'
import authReducer from './authReducer.js';
 
const combinedReducers = combineReducers({
  countriesData: countryReducer,
  citiesData: cityReducer,
  preloader: preloaderReducer,
  auth: authReducer
})

export default combinedReducers