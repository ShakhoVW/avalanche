// Dependencies
import React            from 'react';
import { render }       from 'react-dom';
import { Provider }     from 'react-redux'
import { createStore }  from 'redux'
import todoApp          from './components/map/reducer'

// Components
import App from './components/App.jsx'

// Styles
import './index.scss'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)