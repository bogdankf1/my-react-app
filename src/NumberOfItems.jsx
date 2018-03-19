import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/NumberOfItems.css'

export default class NumberOfItems extends Component {
    render() {
      const listLength = this.props.listLength
      return (
        <div className="Number-of-items">Number of items:{listLength}</div>
      )
    }
}

NumberOfItems.propTypes = {
    listLength:PropTypes.number
}