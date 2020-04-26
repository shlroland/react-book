import './assets/style/icon.css'
import React from 'react'
import { GlobalStyle } from './assets/style/style.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Ebook from './views/ebook'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <Router>
        <Switch>
          <Route path="/ebook" component={Ebook}></Route>
          <Redirect from="/" to="/ebook"></Redirect>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
