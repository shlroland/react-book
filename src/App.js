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
import Store from './views/store'
import { Provider } from 'react-redux'
import store from './store'
import { AliveScope } from 'react-activation'
import styled from 'styled-components'

const AppWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: #7d8188;
  overflow: hidden;
`

function App() {
  return (
    <Provider store={store}>
      <Reset></Reset>
      <Router>
        <AliveScope>
          <AppWrapper>
            <Switch>
              <Route path="/ebook" component={Ebook}></Route>
              <Route path="/book-store" component={Store}></Route>
              <Redirect from="/" to="/book-store"></Redirect>
            </Switch>
          </AppWrapper>
        </AliveScope>
      </Router>
    </Provider>
  )
}

export default App
