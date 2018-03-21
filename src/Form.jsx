import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/Form.css'

export default class Form extends Component {
    search(e) {  
        e.preventDefault()
        this.props.searchItem(e.target.firstChild.value)
    }

    validate(e) {
        if (e.target.value.match(/^[ ]+$/)) {
            e.target.value = ''
        }
        return !e.target.value ? false : true
    }

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.search.bind(this)}>
                    <input type="text" 
                            placeholder="Which country do you want to search?" 
                            ref="search" 
                            onChange={this.validate}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

Form.propTypes = {
    searchItem: PropTypes.func
}