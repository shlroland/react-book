import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './components/EbookReader'
import EbookTitle from './components/EbookTitle'
import EbookMenu from './components/EbookMenu'
import EbookBookMark from './components/EbookBookMark'
import EbookHeader from './components/EbookHeader'
import EbookFooter from './components/EbookFooter'
import ThemeContext from './Context'
import { ThemeProvider } from 'styled-components'
import { genGlobalThemeList } from '@/utils/book'
import { saveReadTime, getReadTime } from '@/utils/localStorage'
import { useSelector } from 'react-redux'
import { EbookWrapper } from './style'

const Ebook = () => {
  const [initTheme, setInitTheme] = useState(genGlobalThemeList())
  const task = useRef(null)
  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))
  const offsetY = useSelector((state) => state.getIn(['ebook', 'offsetY']))
  const menuVisible = useSelector((state) => state.getIn(['ebook', 'menuVisible']))
  const bookAvailable = useSelector((state) => state.getIn(['ebook', 'bookAvailable']))

  const Y = useMemo(()=>{
    if (!menuVisible && bookAvailable) {
      return offsetY
    } else {
      return 0
    }
  },[bookAvailable, menuVisible, offsetY])

  useEffect(() => {
    if (fileName) {
      let readTime = getReadTime(fileName)
      if (!readTime) {
        readTime = 0
      }
      task.current = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(fileName, readTime)
        }
      }, 1000)
      return () => {
        clearInterval(task.current)
      }
    }
  }, [fileName])

  return (
    <ThemeContext.Provider value={{ initTheme, setInitTheme }}>
      <ThemeProvider theme={initTheme}>
        <EbookWrapper Y={Y}>
          <EbookBookMark></EbookBookMark>
          <EbookHeader></EbookHeader>
          <EbookTitle></EbookTitle>
          <Route path="/ebook/:fileName" component={EbookReader}></Route>
          <EbookMenu></EbookMenu>
          <EbookFooter></EbookFooter>
        </EbookWrapper>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default Ebook
