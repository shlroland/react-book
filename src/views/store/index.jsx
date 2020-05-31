import React from 'react'
import { Route ,Redirect} from 'react-router-dom'
import BookHome from './components/home'
import BookDetail from './components/detail'
import BookList from './components/list'
import BookShelf from './components/shelf'
import BookCategory from './components/category'

const Store = () => {
    return (
        <>
        <Route path="/book-store/home" component={BookHome} exact></Route>
        <Route path="/book-store/detail/:fileName" component={BookDetail} exact></Route>
        <Route path="/book-store/list" component={BookList} exact></Route>
        <Route path="/book-store/shelf" component={BookShelf} exact></Route>
        <Route path="/book-store/category/:title" component={BookCategory} exact></Route>
        <Redirect from="/book-store" to="/book-store/shelf"></Redirect>
        </>
    )
}

export default Store