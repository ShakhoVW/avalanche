// Dependencies
import React            from 'react';
import { render }       from 'react-dom';
import { Provider }     from 'react-redux'
import thunk            from 'redux-thunk'
import reducer          from './components/map/reducer'
import { createStore, applyMiddleware }  from 'redux'

// Components
import App from './components/App.jsx'

// Styles
import './index.scss'

const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)