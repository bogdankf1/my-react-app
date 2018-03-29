import React, { Component } from 'react'
import './../css/SignUp.css'
import { Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

class SignUp extends Component {
	constructor() {
		super()
		this.validInputs = false
	}

	sendUserDataToServer(e) {
		e.preventDefault()
		const userData = this.getUserData()
		this.props.store.dispatch(actionCreators.createUserAccount(userData))
		 .then((response) => {
			if(!response.status) {
				document.getElementById('username-status').innerHTML = ""
				const error = document.createTextNode(`Account with such email is already exist!`)
				document.getElementById('username-status').appendChild(error)
			}
		 })
	}

	getUserData() {
		const user = {}
		user.firstname = document.getElementById('firstname').value
		user.lastname = document.getElementById('lastname').value
		user.username = document.getElementById('username').value
		user.password = document.getElementById('password').value
		user.confirmedPassword = document.getElementById('confirm-password').value
		return user
	}

	comparePassword() {
		const password = document.getElementById('password').value,
			confirmedPassword = document.getElementById('confirm-password').value
		if(password !== confirmedPassword) {
			document.getElementById('confirm-status').innerHTML = ""
			const status = document.createTextNode("Passwords should be same!")
			document.getElementById('confirm-status').appendChild(status)
			return false
		} else {document.getElementById('confirm-status').innerHTML = ""}
		return true
	}

	validation(e) {
		if (!e.target.value.match(/^[a-zA-Z0-9_]+$/)){
			e.target.value = ''
		}
		return !e.target.value ? false : true
	}

	enableSubmitBtn(e) {
		if(document.getElementById('firstname').value &&
		   document.getElementById('lastname').value &&
		   document.getElementById('username').value &&
		   document.getElementById('password').value &&
		   document.getElementById('confirm-password').value &&
		   this.comparePassword() && this.validInputs) {
			document.getElementById('signup-btn').classList.remove('disabled')
		} else {
		  	document.getElementById('signup-btn').classList.add('disabled')
		}
	}

	checkLength(e) {
		const minLength = 4
		if(e.target.tagName !== 'INPUT') return
		if(e.target.value.length < minLength) {
			this.validInputs = false
			document.getElementById(`${e.target.id}-status`).innerHTML = ""
			const status = document.createTextNode(`${e.target.id} should be at least ${minLength} symbols!`)
			document.getElementById(`${e.target.id}-status`).appendChild(status)
		} else {
			this.validInputs = true
			document.getElementById(`${e.target.id}-status`).innerHTML = ""
		}
	}

	render() {
		const status = this.props.store.getState().auth.status
		if(status) {
			this.props.store.dispatch(actionCreators.cancelStatus())
			return <Redirect to={{ pathname: "/login" }} />
		}
		return (
			<div className="SignUp">
				<h3>Sign Up</h3>
				<form onChange={this.validation.bind(this)}
					  onKeyUp={this.enableSubmitBtn.bind(this)}
					  onKeyPress={(e) => {if(e.key === 'Enter')e.preventDefault()}}
					  onBlur={this.checkLength.bind(this)}>
					<div>
						<label htmlFor="firstname">Firstname</label>
						<input type="text" id="firstname" placeholder="'John'"/>
						<div id="firstname-status" className="signup-status"></div>
					</div>
					<div>
						<label htmlFor="lastname">Lastname</label>
						<input type="text" id="lastname" placeholder="'Smith'"/>
						<div id="lastname-status" className="signup-status"></div>
					</div>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" id="username" placeholder="'mr_smith'"/>
						<div id="username-status" className="signup-status"></div>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="'pass1234word'"/>
						<div id="password-status" className="signup-status"></div>
					</div>
					<div>
						<label htmlFor="confirm-password">Confirm password</label>
						<input onBlur={this.comparePassword.bind(this)} type="password" id="confirm-password" placeholder="'pass1234word'"/>
						<div id="confirm-password-status" className="signup-status"></div>
						<span id="confirm-status"></span>
					</div>
					<div id="fail-signup-status"></div>
					<div className="auth-buttons">
						<button type="submit" id="signup-btn" className="btn disabled" onClick={this.sendUserDataToServer.bind(this)}>Sign Up</button>
						<div className="login-button">
							<Link to="/login">Log in</Link>
						</div>
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
		createUserAccount: actionCreators.createUserAccount,
		cancelStatus : actionCreators.cancelStatus
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)