import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import App from './App'
import Login, {authentication} from './components/Login'
import SignUp from './components/SignUp'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import * as actionCreators from './actions/actions'
import rootSaga from './sagas/sagas'
import { CANCEL_ACCESS } from './constants/constants';

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const initialState = {}

const action = type => store.dispatch({type})

let store = createStore(
	rootReducer, 
	initialState,
	applyMiddleware(thunk, logger, sagaMiddleware),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

sagaMiddleware.run(rootSaga)

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

class AuthForm extends Component {
	signout() {
		authentication.signout()
		action(CANCEL_ACCESS)
	}
	render() {
		if(authentication.isAuthenticated) {
			return (
				<div className="signout">
					<div className="greeting">Welcome, {`${this.props.store.currentUser.username}`}!</div>
					<div className="signout-btn-wrapper">
						<Link onClick={this.signout.bind(this)} to="/login">Sign out</Link>		
					</div>	
				</div>
			)
		} else {
			return (<div className="signout"></div>)
		} 
	}
} 

class Wrapper extends Component {
	render() {
		return (
			<div className="Wrapper">
				<header className="App-header">
					<AuthForm store={store}/>
					<h1 className="App-title">My application</h1>
				</header>
				<Switch>
					<PrivateRoute exact path="/" component={App} store={store} action={action}/>
					<PropsRoute path="/signup" component={SignUp} store={store} action={action}/>
					<PropsRoute path="/login" component={Login} store={store} action={action}/>
				</Switch>
			</div>
		)
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Wrapper store={store}/>
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root'))
registerServiceWorker()