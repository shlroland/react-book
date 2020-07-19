import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { StoreProvider } from '@/store/ebook'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import { ThemeProvider } from 'styled-components'
import EbookTitle from './pages/ebookTitle/EbookTitle'
import EbookReader from './pages/ebookReader/EbookReader'
import EbookMenu from './pages/ebookMenu/EbookMenu'
import EbookWrapper from './style'
import { reaction } from 'mobx'

const EbookChild: React.FC = () => {
  const ebookStore = useEbookStore()

  useEffect(() => {
    const cleanup = reaction(
      () => ebookStore.menuVisible,
      (visible) => {
        if (!visible) {
          ebookStore.changeSettingVisible(-1)
          ebookStore.changeFontFamilyVisible(false)
        }
      }
    )
    return () => {
      cleanup()
    }
  }, [ebookStore])

  return useObserver(() => (
    <ThemeProvider theme={ebookStore.theme}>
      <EbookWrapper Y={ebookStore.Y}>
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
