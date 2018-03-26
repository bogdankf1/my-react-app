import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './../css/List.css'

export default class List extends Component {
    addItem(item, index) {
        const listItem = <li key={index} index={index}>{item.name}</li>
        // item.hasOwnProperty("selected") && item.selected === true 
        return listItem
    } 

    showSubList(e) {
        if(this.props.hasOwnProperty("onSelect")) {
            const countryIndex = e.target.getAttribute('index')
            const country = this.props.data[countryIndex].name
            // this.props.data.forEach(item => item.selected = false)
            // this.props.data[countryIndex].selected = true
            this.props.onSelect(country)
        }
    }

    render() {
        const items = this.props.data.map((item, i) => this.addItem(item, i))
        return <ul className="List" onClick={this.showSubList.bind(this)}>{items}</ul>
    }
};

//Set default propTypes
List.propTypes =  {
    data: PropTypes.array,
    loadCities: PropTypes.func
}