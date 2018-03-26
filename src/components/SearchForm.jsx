import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './../css/SearchForm.css'

export default class SearchForm extends Component {
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
			<div className="SearchForm">
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

SearchForm.propTypes = {
	searchItem: PropTypes.func
}