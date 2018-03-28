import React, { Component } from 'react'
import './../css/Login.css'
import { Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

export const authentication = {
	isAuthenticated: false,
	authenticate() {
    this.isAuthenticated = true
	},
	signout() {
    this.isAuthenticated = false
	}
}

class Login extends Component {
  login(e) {
    e.preventDefault()
    if(e.target.id !== 'login-submit') {
      return false
    }
    const user = this.getUserData()

    for(const key in user) {
			if(user[key] === "") { 
        document.getElementById("fail-login-status").innerHTML = ""
				const status = document.createTextNode("All fields are required!")
				document.getElementById("fail-login-status").appendChild(status)
        return false 
      }
    }
    
    this.props.store.dispatch(actionCreators.sendUserData(user))
      .then(response => {
        if(response.access) {
          this.props.store.currentUser = user
          authentication.authenticate()
          this.props.store.dispatch(actionCreators.unavailableSignUp())
          this.props.store.dispatch(actionCreators.unavailableLogin())
          this.props.store.dispatch(actionCreators.getAccess(response.access))
        }
      })
  }

  getUserData() {
    const userData = {}
    userData.username = document.getElementById('username').value
    userData.password = document.getElementById('password').value
    return userData
  }

  validation(e) { 
    if (e.target.value.match(/^[ ]+$/)) {
      e.target.value = ''
    }
    return !e.target.value ? false : true
  }

  enableSubmitBtn(e) {
    if(document.getElementById('username').value &&
       document.getElementById('password').value) {
        document.getElementById('login-submit').classList.remove('disabled')
    } else {
      document.getElementById('login-submit').classList.add('disabled')
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
          <input type="text" placeholder="'John Doe'" 
                 id="username"/>
          <span id="status"></span>
          <br/>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="'joHndoE52617'"
                  id="password"/>
          <div id="fail-login-status"></div>
          <div className="auth-buttons">
            <button id="login-submit" type="submit" className="btn disabled" onClick={this.login.bind(this)}>Log in</button>
            <div className="signup-button">
              <Link to="/signup"><button className="btn blue">Sign up</button></Link> 
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
    access: state.auth.access || false
  }
}

//Convert app dispatched actions to app props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    sendUserData: actionCreators.sendUserData,
    getAccess: actionCreators.getAccess,
    cancelAccess: actionCreators.cancelAccess
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)