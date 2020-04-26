import React from 'react'
import {Route} from 'react-router-dom'
import EbookReader from './components/EbookReader'

const Ebook = () => {
    return (
        <>
        <div>1123</div>
            <Route path="/ebook/:fileName" component={EbookReader}></Route>
        </>
    )
}
export default Ebook