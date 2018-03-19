import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/List.css'

export default class List extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }
    addItem(item, index) {
        const listItem = <li key={index} index={index}>{item.name}</li>
        // this.state.selected.selected ? console.log(this.state.selected.index) : ""
        
        return listItem
    } 

    onClickCapture(e) {
        const countryIndex = e.target.getAttribute('index')
        const country = this.props.data[countryIndex].name
        // this.props.data.forEach(item => item.selected = false)
        // this.props.data[countryIndex].selected = true
        this.setState({
            
        })
        this.props.loadCities(country)
    }

    render() {
        const items = this.props.data.map((item, i) => this.addItem(item, i))
        return <ul className="List" onClick={this.onClickCapture.bind(this)}>{items}</ul>
    }
}

//Set default propTypes
List.propTypes =  {
    data: PropTypes.array,
    loadCities: PropTypes.func
}