import React, { Component } from 'react'
import './../css/Login.css'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_SEND_USER_DATA, 
         ALL_FIELDS_ARE_REQUIRED, 
         ALL_FIELDS_ARE_FILLED, 
         LOGIN_AND_PASSWORD_ARE_CORRECT} from './../constants/constants'

export const authentication = {
	isAuthenticated: false,
	authenticate() {this.isAuthenticated = true},
	signout() {this.isAuthenticated = false}
}

class Login extends Component {
  componentDidMount() {
    this.props.store.dispatch({type:LOGIN_AND_PASSWORD_ARE_CORRECT})
  }

  login(e) {
    e.preventDefault()
    const user = this.getUserData()

    for(const key in user) {
			if(user[key] === "") { 
        this.props.store.dispatch({type:ALL_FIELDS_ARE_REQUIRED})        
        return false 
      }
    }
    this.props.store.dispatch({type:ALL_FIELDS_ARE_FILLED})
    this.props.store.dispatch({type:REQUEST_SEND_USER_DATA, payload:user})
  }

  getUserData() {
    const userData = {}
    userData.username = this.username.value
    userData.password = this.password.value
    return userData
  }

  validation(e) { 
    if (e.target.value.match(/^[ ]+$/)) {
      e.target.value = ''
    }
    return !e.target.value ? false : true
  }

  enableSubmitBtn(e) {
    if(this.username.value &&
       this.password.value) {
        this.loginSubmit.classList.remove('disabled')
    } else {
      this.loginSubmit.classList.add('disabled')
    }
  }

  render() {
    const access = this.props.store.getState().auth.access
		if(access) {
      return <Redirect to={{ pathname: "/" } } />
    }
    return (
      <div className="Login">
        <h3>Login</h3>
        <form onChange={this.validation.bind(this)} 
              onKeyUp={this.enableSubmitBtn.bind(this)}>
          <label htmlFor="username">Username:</label>
          <input ref={el => this.username = el} type="text" placeholder="'John Doe'" 
                 id="username"/>
          <br/>
          <label htmlFor="password">Password:</label>
          <input ref={el => this.password = el} type="password" placeholder="'joHndoE52617'"
                  id="password"/>
          <div id="fail-login-status">{this.props.fieldsWarning}{this.props.loginWarning}</div>
          <div className="auth-buttons">
            <button ref={el => this.loginSubmit = el} id="login-submit" type="submit" className="btn disabled" 
                    onClick={this.login.bind(this)}>Log in</button>
            <div className="signup-button">
              <Link to="/signup">Sign up</Link> 
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
    access: state.auth.access || false,
    loginWarning:state.errors.loginWarning || "",
    fieldsWarning: state.errors.fieldsWarning || ""
  }
}

export default connect(mapStateToProps)(Login)