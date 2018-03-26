import React, { Component } from 'react'
import './../css/Login.css'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './../actions/actions'

class Login extends Component {
  sendUserDataToServer(e) {
    e.preventDefault()
    const user = this.getUserData()
    for(const key in user) {
			if(user[key] === "") { return false }
    }
    this.props.store.currentUser = user
    this.props.store.dispatch(actionCreators.sendUserData(user))
    this.props.store.dispatch(actionCreators.unavailableSignUp())
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
    const access = this.props.store.getState().auth.access

    if(access) {
      return <Redirect to={{ pathname: "/" }} />
    }
    return (
      <div className="Login">
        <h3>Login</h3>
        <form onSubmit={this.sendUserDataToServer.bind(this)}>
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
    access: state.auth.access || false,
    availableSignUp: state.auth.available || false
  }
}

//Convert app dispatched actions to app props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    sendUserData: actionCreators.sendUserData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)