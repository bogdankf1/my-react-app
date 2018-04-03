import React, { Component } from 'react'
import './../css/SignUp.css'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { CANCEL_STATUS, 
		 REQUEST_CREATE_USER_ACCOUNT, 
		 PASSWORDS_SHOULD_BE_SAME, 
		 MIN_LENGTH, 
		 INCORRECT_VALUE_LENGTH, 
		 PASSWORDS_ARE_SAME,
		 VALUE_LENGTH_IS_CORRECT} from '../constants/constants';

class SignUp extends Component {
	constructor() {
		super()
		this.validInputs = false
	}

	sendUserDataToServer(e) {
		e.preventDefault()
		const userData = this.getUserData()
		this.props.store.dispatch({type:REQUEST_CREATE_USER_ACCOUNT, payload:userData})
	}

	getUserData() {
		const user = {}
		user.firstname = this.firstname.value
		user.lastname = this.lastname.value
		user.username = this.username.value
		user.password = this.password.value
		user.confirmedPassword = this.confirmPassword.value
		return user
	}

	comparePassword() {
		const password = this.password.value,
			confirmedPassword = this.confirmPassword.value
		if(password !== confirmedPassword) {
			this.props.store.dispatch({type:PASSWORDS_SHOULD_BE_SAME})
			return false
		} else {this.props.store.dispatch({type:PASSWORDS_ARE_SAME})}
		return true
	}

	validation(e) {
		if (!e.target.value.match(/^[a-zA-Z0-9_]+$/)){
			e.target.value = ''
		}
		return !e.target.value ? false : true
	}

	enableSubmitBtn(e) {
		if(this.firstname.value && this.lastname.value &&
		   this.username.value && this.password.value &&
		   this.confirmPassword.value && this.comparePassword() && 
		   this.validInputs) {
			this.signupBtn.classList.remove('disabled')
		} else {
		  	this.signupBtn.classList.add('disabled')
		}
	}

	checkLength(e) {
		if(e.target.tagName !== 'INPUT') return
		if(e.target.value.length < MIN_LENGTH) {
			this.validInputs = false
			this.props.store.dispatch({type:INCORRECT_VALUE_LENGTH})
		} else {
			this.validInputs = true
			this.props.store.dispatch({type:VALUE_LENGTH_IS_CORRECT})
		}
	}

	render() {
		const status = this.props.store.getState().auth.status
		if(status) {
			this.props.store.dispatch({type:CANCEL_STATUS, status:false})
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
						<input ref={el => this.firstname = el} type="text" id="firstname" placeholder="'John'"/>
					</div>
					<div>
						<label htmlFor="lastname">Lastname</label>
						<input ref={el => this.lastname = el} type="text" id="lastname" placeholder="'Smith'"/>
					</div>
					<div>
						<label htmlFor="username">Username</label>
						<input ref={el => this.username = el} type="text" id="username" placeholder="'mr_smith'"/>
						<div id="username-status" className="signup-status">{this.props.usernameWarning}</div>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input ref={el => this.password = el} type="password" id="password" placeholder="'pass1234word'"/>
					</div>
					<div>
						<label htmlFor="confirm-password">Confirm password</label>
						<input ref={el => this.confirmPassword = el} onBlur={this.comparePassword.bind(this)} 
							   type="password" id="confirm-password" placeholder="'pass1234word'"/>
						<span ref={el => this.confirmStatus = el}id="confirm-status">{this.props.passwordWarning}</span>
					</div>
					<div className="auth-buttons">
						<div className="signup-status">{this.props.valueLengthWarning}</div>
						<button ref={el => this.signupBtn = el} type="submit" id="signup-btn" 
								className="btn disabled" onClick={this.sendUserDataToServer.bind(this)}>Sign Up</button>
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
	  status: state.auth.status || false,
	  usernameWarning: state.errors.usernameWarning || "",
	  passwordWarning: state.errors.passwordWarning || "",
	  valueLengthWarning: state.errors.valueLengthWarning || ""
	}
}

export default connect(mapStateToProps)(SignUp)