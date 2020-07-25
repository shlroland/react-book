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
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { AliveScope } from 'react-activation'

const EbookChild: React.FC = () => {
  const ebookStore = useEbookStore()

  useEffect(() => {
    let timer: number
    const cleanUpVisible = reaction(
      () => ebookStore.menuVisible,
      (visible) => {
        if (!visible) {
          ebookStore.changeSettingVisible(-1)
          ebookStore.changeFontFamilyVisible(false)
        }
      }
    )
    let readTime = getReadTime(ebookStore.fileName)
    if (!readTime) {
      readTime = 0
    } else {
      ebookStore.changeReadTime(Math.ceil(readTime / 60))
    }
    timer = setInterval(() => {
      readTime++
      if (readTime % 30 === 0) {
        ebookStore.changeReadTime(Math.ceil(readTime / 60))
        saveReadTime(ebookStore.fileName, readTime)
      }
    }, 1000)
    // const cleanUpTime = reaction(
    //   () => ebookStore.fileName,
    //   (fileName) => {
    //     let readTime = getReadTime(fileName)
    //     if (!readTime) {
    //       readTime = 0
    //     }
    //     timer = setInterval(() => {
    //       readTime++
    //       console.log(readTime)
    //       if (readTime % 30 === 0) {
    //         ebookStore.changeReadTime(readTime)
    //         saveReadTime(fileName, readTime)
    //       }
    //     }, 1000)
    //   }

    // )
    return () => {
      cleanUpVisible()
      // cleanUpTime()
      clearInterval(timer)
    }
  }, [ebookStore])

  return useObserver(() => (
    <ThemeProvider theme={ebookStore.theme}>
      <AliveScope>
        <EbookWrapper Y={ebookStore.Y}>
          <EbookTitle></EbookTitle>
          <Route path="/ebook/:fileName" component={EbookReader}></Route>
          <EbookMenu></EbookMenu>
        </EbookWrapper>
      </AliveScope>
    </ThemeProvider>
  ))
}

const Ebook: React.FC = () => (
  <StoreProvider>
    <EbookChild></EbookChild>
  </StoreProvider>
)

export default Ebook
