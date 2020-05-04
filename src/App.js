import './assets/style/icon.css'
import React from 'react'
import { Reset } from './assets/style'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Ebook from './views/ebook'
import { Provider } from 'react-redux'
import store from './store'
import { AliveScope } from 'react-activation'

function App() {
  return (
    <Provider store={store}>
      <Reset></Reset>
      <Router>
        <AliveScope>
          <Switch>
            <Route path="/ebook" component={Ebook}></Route>
            <Redirect from="/" to="/ebook"></Redirect>
          </Switch>
        </AliveScope>
      </Router>
    </Provider>
  )
}

export default App
