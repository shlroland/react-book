import React from 'react'
import { Reboot } from './assets/styles'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Ebook from './views/ebook'
import Mall from './views/mall'
import { StoreProvider } from './store/global'
import './assets/styles/icon.css'

function App() {
  return (
    <StoreProvider>
      <Reboot></Reboot>
      <Router>
        <Switch>
          <Route path="/ebook" component={Ebook}></Route>
          <Route path="/mall" component={Mall}></Route>
          <Redirect from="/" to="/ebook"></Redirect>
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App
