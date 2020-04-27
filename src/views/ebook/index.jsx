import React from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './components/EbookReader'
import EbookTitle from './components/EbookTitle'
import EbookMenu from './components/EbookMenu'
const Ebook = () => {
  return (
    <>
      <EbookTitle></EbookTitle>
      <Route path="/ebook/:fileName" component={EbookReader}></Route>
      <EbookMenu></EbookMenu>
    </>
  )
}
export default Ebook
