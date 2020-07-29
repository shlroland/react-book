import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import BookHome from './home'
import BookDetail from './detail'

const Mall: React.FC = () => {
  return (
    <>
      <Route path="/mall/home" component={BookHome} exact></Route>
      <Route path="/mall/detail/:fileName" component={BookDetail} exact></Route>
      <Redirect from="/mall" to="/mall/home"></Redirect>
    </>
  )
}

export default Mall
