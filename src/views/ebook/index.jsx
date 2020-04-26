import React from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './components/EbookReader'
import EbookTitle from './components/EbookTitle'
const Ebook = () => {
  return (
    <>
      <EbookTitle></EbookTitle>
      <Route path="/ebook/:fileName" component={EbookReader}></Route>
    </>
  )
}
export default Ebook
