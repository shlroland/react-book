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
import 'mobx-react/batchingForReactDom'
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
    <StoreProvider>
      <Reboot></Reboot>
      <Router>
        <AppWrapper>
          <Switch>
            <Route path="/ebook" component={Ebook}></Route>
            <Route path="/mall" component={Mall}></Route>
            <Redirect from="/" to="/mall"></Redirect>
          </Switch>
        </AppWrapper>
      </Router>
    </StoreProvider>
  )
}

export default App
