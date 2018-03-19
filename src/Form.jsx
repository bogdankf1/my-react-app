import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/Form.css'

class Form extends Component {
    onSubmitCapture(e) {  
        e.preventDefault()
        this.props.searchItem(e.target.firstChild.value)
    }

    validateForm(e) {
        if (e.target.value.match(/^[ ]+$/)) {
            e.target.value = ''
        }
        return !e.target.value ? false : true
    }

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.onSubmitCapture.bind(this)}>
                    <input type="text" placeholder="Which country do you want to search?" ref="search" onChange={this.validateForm}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

Form.propTypes = {
    searchItem: PropTypes.func
}

export default Form