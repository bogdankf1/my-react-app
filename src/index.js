import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './index.css'
import App from './App'
import Login, {authentication} from './components/Login'
import SignUp from './components/SignUp'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/actions'

const logger = createLogger()
const initialState = {}

let store = createStore(
	rootReducer, 
	initialState,
	applyMiddleware(thunk, logger),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest)
	return (React.createElement(component, finalProps))
}
  
const PropsRoute = ({ component, ...rest }) => {
	return (
		<Route {...rest} render={props => {
			return renderMergedProps(component, props, rest)
		}}/>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={props => {
			return authentication.isAuthenticated ? 
			(renderMergedProps(Component, props, rest)) : 
			(<Redirect	to={{ pathname: "/login" }}/>)
		}}/>
	)
}

class LogOut extends Component {
	signout() {
		authentication.signout()
		this.props.store.dispatch(actionCreators.cancelAccess())
		// this.props.store.dispatch(actionCreators.availableSignUp())
		// this.props.store.dispatch(actionCreators.availableLogin())
	}
	render() {
		if(authentication.isAuthenticated) {
			return (
				<div className="signout">
					<div className="greeting">Welcome, {`${this.props.store.currentUser.username}`}!</div>
					<div className="signout-btn-wrapper">
						<button className="btn blue signout-button">
							<Link onClick={this.signout.bind(this)} to="/login">Sign out</Link>
						</button>
					</div>	
				</div>
			)
		} else {
			return (
				<div className="signout">You are not logged in.</div>
			)
		} 
	}
} 
// withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOut))

class Wrapper extends Component {
	// componentWillMount() {
	// 	this.props.store.dispatch(actionCreators.availableSignUp())
	// 	this.props.store.dispatch(actionCreators.availableLogin())
	// }

	render() {
		return (
			<div className="Wrapper">
				<header className="App-header">
					{/* {this.props.store.getState().auth.availableLogin && <Link className="login-button" to="/login">Log in</Link>} */}
					{/* {this.props.store.getState().auth.availableSignUp && <Link className="signup-button" id="signup" to="/signup">Sign up</Link>} */}
					<LogOut store={store}/>
					<h1 className="App-title">My application</h1>
				</header>
				<Switch>
					<PrivateRoute exact path="/" component={App} store={store}/>
					<PropsRoute path="/signup" component={SignUp} store={store}/>
					<PropsRoute path="/login" component={Login} store={store}/>
				</Switch>
			</div>
		)
	}
}

//Convert app state to app props
// const mapStateToProps = state => {
// 	return {
// 		availableSignUp: state.auth.availableSignUp || true,
// 		availableLogin: state.auth.availableLogin || true
// 	}
// }
// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators({
// 		unavailableSignUp: actionCreators.unavailableSignUp,
// 		availableSignUp: actionCreators.availableSignUp,
// 		unavailableLogin: actionCreators.unavailableLogin,
// 		availableLogin: actionCreators.availableLogin
// 	}, dispatch)
// }
// withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Wrapper store={store}/>
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root'))
registerServiceWorker()