import React, { Component } from 'react'
import './../css/Login.css'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

export const authentication = {
	isAuthenticated: false,
	authenticate(cb) {
    console.log("authenticate")
    this.isAuthenticated = true
	},
	signout(cb) {
    console.log("signout")
    this.isAuthenticated = false
	}
}

class Login extends Component {
  login(e) {
    e.preventDefault()
    const user = this.getUserData()

    for(const key in user) {
			if(user[key] === "") { return false }
    }
    
    this.props.store.dispatch(actionCreators.sendUserData(user))
      .then(response => {
        authentication.authenticate(() =>
          this.props.store.dispatch(actionCreators.getAccess(response.access))
        )
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

  render() {
    // const access = this.props.store.getState().auth.access
    const access = this.props.access
    console.log(this.props)
    const { from } = this.props.location.state || { from: { pathname: "/" } }
		if(access) {
			return <Redirect to={from} />
		}
    return (
      <div className="Login">
        <h3>Login</h3>
        <form onSubmit={this.login.bind(this)}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="'John Doe'" 
                 id="username" onChange={this.validation.bind(this)}/>
          <span id="status"></span>
          <br/>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="'joHndoE52617'"
                  id="password" onChange={this.validation.bind(this)}/>
          <div id="fail-status"></div>
          <button type="submit" className="btn">Log in</button>
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
    getAccess: actionCreators.getAccess
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)