import React from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './pages/EbookReader'

const Ebook: React.FC = () => {
  return (
    <>
      <Route path="/ebook/:fileName" component={EbookReader}></Route>
    </>
  )
}

export default Ebook
