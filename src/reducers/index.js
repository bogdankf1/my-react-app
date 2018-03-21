import { combineReducers } from 'redux'
import countryReducer from './countryReducer.js'
import cityReducer from './cityReducer.js'
import preloaderReducer from './preloaderReducer.js'
 
const combinedReducers = combineReducers({
  countriesData: countryReducer,
  citiesData: cityReducer,
  preloader: preloaderReducer
})

export default combinedReducers