import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/actions'
import { withRouter } from 'react-router-dom'
import './css/App.css'
import List from './components/List'
import SearchForm from './components/SearchForm'
import Preloader from './components/Preloader'
import NumberOfItems from './components/NumberOfItems'
import { SHOW_PRELOADER,
        HIDE_PRELOADER,
        SHOW_ALL_COUNTRIES, 
        SHOW_FOUND_COUNTRIES,
        RECEIVE_COUNTRIES,
        RECEIVE_CITIES,
        HIDE_CITIES,
        GET_ACCESS,
        CREATE_ACCOUNT,
        CANCEL_ACCESS,
        CANCEL_STATUS
} from './constants/constants';

// import {action} from './index'
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
    // this.props.onReceiveCountries()
    // this.props.store.dispatch(actionCreators.showPreloader())
    this.props.action(SHOW_PRELOADER)
    // this.props.action(RECEIVE_COUNTRIES)
    // this.props.store
    //   .dispatch(actionCreators.fetchCountries())
    //   .then(() => this.allCountries = this.props.store.getState().countriesData.countries)
    //   .then(() => this.props.store.dispatch(actionCreators.hidePreloader()))
  }

  //Load cities from the server
  loadCities(countryName) {
    this.props.store.dispatch(actionCreators.showPreloader())
    this.props.store
      .dispatch(actionCreators.fetchCities(countryName))
      .then(() => this.props.store.dispatch(actionCreators.hidePreloader()))
  }

  //Search country in the list
  searchItem(request) {
    const foundItems = this.props.countries.filter(item => {
      if(item.name.toLowerCase().indexOf(request) !== -1) {
        return item
      }
    })
    this.props.store.dispatch(actionCreators.showFoundCountries(foundItems))
    return foundItems
  }

  //Display full list of countries
  showAllCountries() {
    this.props.store.dispatch(actionCreators.showAllCountries(this.allCountries))
    this.props.store.dispatch(actionCreators.hideCities())
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
    showPreloader: state.preloader.showPreloader || false
  }
}

//Convert app dispatched actions to app props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCountries: actionCreators.fetchCountries,
    fetchCities: actionCreators.fetchCities,
    hideCities: actionCreators.hideCities
  }, dispatch)
}

//Connect app and map state and dispatch to props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
