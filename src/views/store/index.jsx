import React from 'react'
import { Route } from 'react-router-dom'
import BookHome from './components/home'


const Store = () => {
    return (
        <>
        <Route path="/book-store/home" component={BookHome} exact></Route>
        </>
    )
}

export default Store