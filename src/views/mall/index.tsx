import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import BookHome from './home'

const Mall: React.FC = () => {
  return (
    <>
      <Route path="/mall/home" component={BookHome}></Route>
      <Redirect from="/mall" to="/mall/home"></Redirect>
    </>
  )
}

export default Mall
