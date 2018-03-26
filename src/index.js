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
import Login from './components/Login'
import SignUp from './components/SignUp'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

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

class Wrapper extends Component {
	render() {
		return (
			<div className="Wrapper">
				<header className="App-header">
					<div>
						<Link to="/login">Log in</Link>
						<Link to="/signup">Sign up</Link>
						<Link id="logout" to="/login">Log out</Link>
					</div>
          			<h1 className="App-title">My application</h1>
        		</header>
				<Switch>
					<PropsRoute exact path="/" component={App} store={store}/>
					<PropsRoute path="/signup" component={SignUp} store={store}/>
					<PropsRoute path="/login" component={Login} store={store}/>
				</Switch>
			</div>
		)
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Wrapper />
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root'))
registerServiceWorker()