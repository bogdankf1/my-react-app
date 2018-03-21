import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>, 
    document.getElementById('root'))
registerServiceWorker()