import React, { Component } from 'react'
import './../css/SignUp.css'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

class SignUp extends Component {
	sendUserDataToServer(e) {
		e.preventDefault()
		  
		const userData = {}
		userData.firstname = document.getElementById('firstname').value
		userData.lastname = document.getElementById('lastname').value
		userData.username = document.getElementById('username').value
		userData.password = document.getElementById('password').value

		for(const key in userData) {
			if(userData[key] === "") { return false }
		}

		this.props.store.dispatch(actionCreators.createUserAccount(userData))
	}

	comparePassword() {
		const password = document.getElementById('password').value,
					confirmedPassword = document.getElementById('confirm-password').value
		if(password !== confirmedPassword) {
			document.getElementById('confirm-status').innerHTML = ""
			const status = document.createTextNode("Passwords should be same!")
			document.getElementById('confirm-status').appendChild(status)
			return false
		}
		return true
	}

	validation(e) { 
		if (e.target.value.match(/^[ ]+$/)) {
			e.target.value = ''
		}
		return !e.target.value ? false : true
	}

	render() {
		const status = this.props.store.getState().auth.status
		if(status) {
			return <Redirect to={{ pathname: "/login" }} />
		}
		return (
			<div className="SignUp">
				<h3>Sign Up</h3>
				<form onSubmit={this.sendUserDataToServer.bind(this)}
					  onChange={this.validation.bind(this)}>
					<div>
						<label htmlFor="firstname">Firstname</label>
						<input type="text" id="firstname" />
					</div>
					<div>
						<label htmlFor="lastname">Lastname</label>
						<input type="text" id="lastname"/>
					</div>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" id="username"/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password"/>
					</div>
					<div>
						<label htmlFor="confirm-password">Confirm password</label>
						<input onBlur={this.comparePassword.bind(this)} type="password" id="confirm-password"/>
						<span id="confirm-status"></span>
					</div>
					<div>
						<button type="submit" id="signup-btn" className="btn">Sign Up</button>
					</div>
				</form>
			</div>
		)
	}
}

//Convert app state to app props
const mapStateToProps = state => {
	return {
	  status: state.auth.status || false
	}
}

//Convert app dispatched actions to app props
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		createUserAccount: actionCreators.createUserAccount
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)