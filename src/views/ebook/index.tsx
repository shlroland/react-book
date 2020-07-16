import React from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './pages/EbookReader'
import { StoreProvider } from '@/store/ebook'

const Ebook: React.FC = () => {
  return (
    <StoreProvider>
      <Route path="/ebook/:fileName" component={EbookReader}></Route>
    </StoreProvider>
  )
}

export default Ebook
