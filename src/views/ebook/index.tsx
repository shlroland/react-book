import React from 'react'
import { Route } from 'react-router-dom'
import { StoreProvider, useStore as useEbookStore } from '@/store/ebook'
import { ThemeProvider } from 'styled-components'
import EbookTitle from './pages/ebookTitle/EbookTitle'
import EbookReader from './pages/ebookReader/EbookReader'

const Ebook: React.FC = () => {
  const { theme } = useEbookStore()
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <EbookTitle></EbookTitle>
        <Route path="/ebook/:fileName" component={EbookReader}></Route>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default Ebook
