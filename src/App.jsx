//Add correct selection with highlight
//Change action dispatching with following tools:
// - redux-thunk
// - redux async actions

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/actionCreators'
import './css/App.css'
import List from './List'
import Form from './Form'
import Preloader from './Preloader'
import NumberOfItems from './NumberOfItems'

class App extends Component {
  constructor() {
    super()
    this.allCountries = []
  }

  //Load countries from the server
  loadCountries() {
    fetch("http://127.0.0.1:3001/api/country/list")
        .then(response => response.json())
        .then(jsonData => {
          this.allCountries = jsonData
          this.props.store.dispatch(actionCreators.loadCountries(jsonData))
          this.props.store.dispatch(actionCreators.hidePreloader())
        })
  }

  //Do actions before <App /> will mount
  componentWillMount() {
    this.props.store.dispatch(actionCreators.showPreloader())
    this.loadCountries()
  }

  //Load cities from the server
  loadCities(countryName) {
    this.props.store.dispatch(actionCreators.showPreloader())
    fetch(`http://127.0.0.1:3001/api/city/list/${countryName}`)
        .then(response => response.json())
        .then(jsonData => {
          this.props.store.dispatch(actionCreators.loadCities(jsonData))
          this.props.store.dispatch(actionCreators.hidePreloader())
        })
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
    this.props.store.dispatch(actionCreators.loadCities([]))
  }

  //Render full <App />
  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Country list</h1>
        </header>
        {this.props.showPreloader && <Preloader />}
        <div className="List-container">
          <div className="Main-list">
            <Form searchItem={this.searchItem.bind(this)}/>
            <List className="Country-list" data={this.props.countries} onSelect={this.loadCities.bind(this)}/>
            <NumberOfItems listLength={this.props.countries.length}/>
            <div className="Show-all-btn" onClick={this.showAllCountries.bind(this)}>Show all</div>
          </div>
          <List className="City-list" data={this.props.cities} />
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
    loadCountries: actionCreators.loadCountries,
    loadCities: actionCreators.loadCities
  }, dispatch)
}

//Connect app and map state and dispatch to props
export default connect(mapStateToProps, mapDispatchToProps)(App)
