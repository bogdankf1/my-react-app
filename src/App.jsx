//Add correct selection with highlight
//Clean form after click on ShowAllBtn

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/App.css'
import List from './List'
import Form from './Form'
import Preloader from './Preloader'
import NumberOfItems from './NumberOfItems'

export default class App extends Component {
  constructor() {
    super()
    this.allCountries = []
    this.state = {
      countries:[],
      cities:[],
      showPreloader:true
    }
    this.loadCountries()
  }

  //Load countries from a server
  loadCountries() {
    fetch("http://127.0.0.1:3001/api/country/list")
        .then(response => response.json())
        .then(jsonData => {
          this.allCountries = jsonData
          this.setState({countries: jsonData, showPreloader:false})
        })
  }

  loadCities(countryName) {
    this.setState({ showPreloader:true })
    fetch(`http://127.0.0.1:3001/api/city/list/${countryName}`)
        .then(response => response.json())
        .then(jsonData => {
          this.setState({cities: jsonData, showPreloader:false})
        })
  }

  searchItem(request) {
    const searchedItems = this.state.countries.filter((item, index) => {
      if(item.name.toLowerCase().indexOf(request) !== -1) {
        return item
      }
    })
    this.setState({countries: searchedItems})
    return searchedItems
  }

  onClickShowAllBtn() {
    this.setState({countries:this.allCountries, cities:[]})
  }

  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Country list</h1>
        </header>
        {this.state.showPreloader && <Preloader />}
        <div className="List-container">
          <div className="Main-list">
            <Form searchItem={this.searchItem.bind(this)}/>
            <List className="Country-list" data={this.state.countries} loadCities={this.loadCities.bind(this)}/>
            <NumberOfItems listLength={this.state.countries.length}/>
            <div className="Show-all-btn" onClick={this.onClickShowAllBtn.bind(this)}>Show all</div>
          </div>
          <List className="City-list" data={this.state.cities} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  countries: PropTypes.array,
  cities: PropTypes.array
}
