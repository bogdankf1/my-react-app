//Disable Sign Up when user is logged in
//Add Log Out oppoprtunity

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
		<Route {...rest} render={routeProps => {
			return renderMergedProps(component, routeProps, rest)
		}}/>
	)
}

const LogOut = withRouter(
	({ history }) =>
	authentication.isAuthenticated ? (
		<p>
		  Welcome!{" "}
		  	<button className="btn" onClick={() => {
			  	authentication.signout( 
					  () => history.push("/")
				) 
			}}>
			Sign out
		  	</button>
		</p>
	) : ( <p>You are not logged in.</p> )
)

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
	  {...rest}
	  render={props =>
		authentication.isAuthenticated ? ( <Component {...props} />) : (
		  <Redirect
			to={{
			  pathname: "/login",
			  state: { from: props.location }
			}}
		  />
		)
	}
	/>
)

class Wrapper extends Component {
	render() {
		return (
			<div className="Wrapper">
				<header className="App-header">
					<div>
						<Link to="/login">Log in</Link>
						<Link id="signup" to="/signup">Sign up</Link>
						<LogOut/>
						{/*this.props.store.getState().auth.available && <Link id="signup" to="/signup">Sign up</Link> */}
					</div>
          			<h1 className="App-title">My application</h1>
					
        		</header>
				<Switch>
					<PrivateRoute exact path="/" component={App} store={store}/>
					<PropsRoute path="/signup" component={SignUp} store={store}/>
					<PropsRoute path="/login" component={Login} store={store}/>
					{/* <PropsRoute path="/logout" component={Logout} store={store} /> */}
				</Switch>
			</div>
		)
	}
}

//Convert app state to app props
const mapStateToProps = state => {
	return {
	  availableSignUp: state.auth.available || true
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	  
	}, dispatch)
  }
withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Wrapper store={store}/>
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root'))
registerServiceWorker()