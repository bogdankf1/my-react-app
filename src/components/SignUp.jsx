import React, { Component } from 'react'
import './../css/SignUp.css'
import { Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

//passwords should be same before add to users database
//set the min and max length of passwords and usernames'
//message if user create account with existing username

class SignUp extends Component {
	sendUserDataToServer(e) {
		e.preventDefault()
		// if(e.target.id !== 'signup-btn') return false

		const userData = {}
		userData.firstname = document.getElementById('firstname').value
		userData.lastname = document.getElementById('lastname').value
		userData.username = document.getElementById('username').value
		userData.password = document.getElementById('password').value
		// userData.confirmedPassword = document.getElementById('confirm-password').value

		for(const key in userData) {
			if(userData[key] === "") { 
				document.getElementById("fail-signup-status").innerHTML = ""
				const status = document.createTextNode("All fields are required!")
				document.getElementById("fail-signup-status").appendChild(status)
				return false 
			}
		}
		// delete userData.confirmedPassword
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

	enableSubmitBtn(e) {
		if(document.getElementById('firstname').value &&
		   document.getElementById('lastname').value &&
		   document.getElementById('username').value &&
		   document.getElementById('password').value &&
		   document.getElementById('confirm-password').value) {
			document.getElementById('signup-btn').classList.remove('disabled')
		} else {
		  	document.getElementById('signup-btn').classList.add('disabled')
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
					  onKeyUp={this.enableSubmitBtn.bind(this)}>
					<div>
						<label htmlFor="firstname">Firstname</label>
						<input type="text" id="firstname" placeholder="'John'"/>
					</div>
					<div>
						<label htmlFor="lastname">Lastname</label>
						<input type="text" id="lastname" placeholder="'Smith'"/>
					</div>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" id="username" placeholder="'mr_smith'"/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="'pass1234word'"/>
					</div>
					<div>
						<label htmlFor="confirm-password">Confirm password</label>
						<input onBlur={this.comparePassword.bind(this)} type="password" id="confirm-password" placeholder="'pass1234word'"/>
						<span id="confirm-status"></span>
					</div>
					<div id="fail-signup-status"></div>
					<div className="auth-buttons">
						<button type="submit" id="signup-btn" className="btn disabled" onClick={this.sendUserDataToServer.bind(this)}>Sign Up</button>
						<div className="login-button">
							<Link to="/login"><button className="btn blue">Log in</button></Link>
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