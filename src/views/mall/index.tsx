import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import BookHome from './home'
import BookDetail from './detail'
import BookList from './detail/BookList'
import BookShelf from './shelf'
import BookCategory from './shelf/shelfCategory'

const Mall: React.FC = () => {
  return (
    <>
      <Route path="/mall/home" component={BookHome} exact></Route>
      <Route path="/mall/detail/:fileName" component={BookDetail} exact></Route>
      <Route path="/mall/category/:title" component={BookCategory} exact></Route>
      <Route path="/mall/list" component={BookList} exact></Route>
      <Route path="/mall/shelf" component={BookShelf} exact></Route>
      <Redirect from="/mall" to="/mall/shelf"></Redirect>
    </>
  )
}

export default Mall
