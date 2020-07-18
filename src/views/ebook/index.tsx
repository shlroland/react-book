import React from 'react'
import { Route } from 'react-router-dom'
import { StoreProvider } from '@/store/ebook'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import { ThemeProvider } from 'styled-components'
import EbookTitle from './pages/ebookTitle/EbookTitle'
import EbookReader from './pages/ebookReader/EbookReader'
import EbookMenu from './pages/ebookMenu/EbookMenu'
import EbookWrapper from './style'

const EbookChild: React.FC = () => {
  const { Y,theme } = useEbookStore()
  return useObserver(() => (
    <ThemeProvider theme={theme}>
      <EbookWrapper Y={Y}>
        <EbookTitle></EbookTitle>
        <Route path="/ebook/:fileName" component={EbookReader}></Route>
        <EbookMenu></EbookMenu>
      </EbookWrapper>
    </ThemeProvider>
  ))
}

const Ebook: React.FC = () => (
  <StoreProvider>
    <EbookChild></EbookChild>
  </StoreProvider>
)

export default Ebook
