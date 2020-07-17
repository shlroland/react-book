import React from 'react'
import { Route } from 'react-router-dom'
import { StoreProvider } from '@/store/ebook'
import { useStore as useGlobalStore } from '@/store/global'
import { ThemeProvider } from 'styled-components'
import EbookTitle from './pages/ebookTitle/EbookTitle'
import EbookReader from './pages/ebookReader/EbookReader'
import EbookMenu from './pages/ebookMenu/EbookMenu'

const Ebook: React.FC = () => {
  const { theme } = useGlobalStore()
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <EbookTitle></EbookTitle>
        <Route path="/ebook/:fileName" component={EbookReader}></Route>
        <EbookMenu></EbookMenu>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default Ebook
