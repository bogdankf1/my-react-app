import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './css/App.css'
import List from './components/List'
import SearchForm from './components/SearchForm'
import Preloader from './components/Preloader'
import NumberOfItems from './components/NumberOfItems'
import {
        REQUEST_COUNTRIES, 
        REQUEST_CITIES, 
        SHOW_FOUND_COUNTRIES, 
        SHOW_ALL_COUNTRIES, 
        HIDE_CITIES
} from './constants/constants';

class App extends Component {
  constructor() {
    super()
    this.allCountries = []
  }

  //Do actions before <App /> will mount
  componentWillMount() {
    this.loadCountries()
  }

  //Load countries from the server
  loadCountries() {
    this.props.action(REQUEST_COUNTRIES)
  }

  //Load cities from the server
  loadCities(countryName) {
    this.props.store.dispatch({type:REQUEST_CITIES, countryName:countryName})
  }

  //Search country in the list
  searchItem(request) {
    this.allCountries = this.props.store.getState().countriesData.countries
    const foundItems = this.props.countries.filter(item => {
      if(item.name.toLowerCase().indexOf(request) !== -1) {
        return item
      }
    })
    this.props.store.dispatch({type:SHOW_FOUND_COUNTRIES, data:foundItems})
    return foundItems
  }

  //Display full list of countries
  showAllCountries() {
    this.props.store.dispatch({type:SHOW_ALL_COUNTRIES, data:this.allCountries})
    this.props.action(HIDE_CITIES)
  }

  //Render full <App />
  render() {    
    return (
      <div className="App">
        <div className="App-content">
          <div className="List-container">
            {this.props.showPreloader && <Preloader />}
            <div className="Main-list">
              <SearchForm searchItem={this.searchItem.bind(this)}/>
              <List className="Country-list" data={this.props.countries} onSelect={this.loadCities.bind(this)}/>
              <NumberOfItems listLength={this.props.countries.length}/>
              <div className="Show-all-btn" onClick={this.showAllCountries.bind(this)}>Show all</div>
            </div>
            <List className="City-list" data={this.props.cities} />
          </div>
        </div>
      </div>
    )
  }
}

//Specify application prop types
App.propTypes = {
  countries: PropTypes.array,
  cities: PropTypes.array
}

//Convert app state to app props
const mapStateToProps = state => {
  return {
    countries: state.countriesData.countries || [],
    cities: state.citiesData.cities || [],
    showPreloader: state.preloader.visibility || false
  }
}

//Connect app and map state and dispatch to props
export default withRouter(connect(mapStateToProps)(App))
