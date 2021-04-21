import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './App'
import './styles'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
console.log('State',store.getState());
ReactDom.render(
            <Provider store={store}>
            <App />
            </Provider>, 
            document.getElementById('root')
            )