import React, { useEffect, useRef, useCallback, useMemo,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as actions } from '../store'
import Epub from 'epubjs'
import {
  changeSettingVisible,
  changeCurrentBook,
  changeFontFamilyVisible,
  changeDefaultFontFamily,
  changeDefaultFontSize,
  changeDefaultTheme,
} from '../store/actionCreators'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
} from '@/utils/localStorage'
import { genThemeList } from '@/utils/book'
import { useTranslation } from 'react-i18next'
import ThemeContext from '../Context'
import { genGlobalThemeList } from '@/utils/book'

const { changeFileName, changeMenuVisible } = actions

const EbookReader = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('book')
  const { fileName } = useParams()
  const { setInitTheme } = useContext(ThemeContext)

  const {
    menuVisible,
    currentBook,
    defaultFontFamily,
    defaultFontSize,
  } = useSelector((state) => state.get('ebook').toJS())

  const rendition = useRef(null)
  const themeList = useRef(genThemeList(t))
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)

  const prevPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.prev()
    }
  }, [])

  const nextPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.next()
    }
  }, [])

  const toggleMenuVisible = useCallback(() => {
    if (menuVisible) {
      dispatch(changeSettingVisible(-1))
      dispatch(changeFontFamilyVisible(false))
    }
    dispatch(changeMenuVisible(!menuVisible))
  }, [dispatch, menuVisible])

  const registerTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].clientX
    touchStartTime.current = e.timeStamp
  }, [])

  const registerTouchEnd = useCallback(
    (e) => {
      const offsetX = e.changedTouches[0].clientX - touchStartX.current
      const time = e.timeStamp - touchStartTime.current
      if (time < 500 && offsetX > 40) {
        prevPage()
        if (menuVisible) {
          toggleMenuVisible()
        }
      } else if (time < 500 && offsetX < -40) {
        nextPage()
        if (menuVisible) {
          toggleMenuVisible()
        }
      } else {
        toggleMenuVisible()
      }
      e.stopPropagation()
    },
    [menuVisible, nextPage, prevPage, toggleMenuVisible]
  )

  const getDefaultFontSize = useMemo(() => {
    let font = getFontSize(fileName)
    return font ? font : defaultFontSize
  }, [defaultFontSize, fileName])

  const getDefaultFontFamily = useMemo(() => {
    let font = getFontFamily(fileName)
    return font ? font : defaultFontFamily
  }, [defaultFontFamily, fileName])

  useEffect(() => {
    const url = `${process.env.REACT_APP_BOOK_URL}/${fileName
      .split('|')
      .join('/')}.epub`
    const constant = new Epub(url)
    dispatch(changeFileName(fileName))
    dispatch(changeCurrentBook(constant))
  }, [dispatch, fileName])

  useEffect(() => {
    if (currentBook) {
      rendition.current = currentBook.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default',
      })
      rendition.current.hooks.content.register((contents) => {
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/daysOne.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/tangerine.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/montserrat.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/cabin.css`
        )
      })
      rendition.current.display()
    }
  }, [currentBook, dispatch])

  useEffect(() => { // initFontSize
    if (currentBook) {
      saveFontSize(fileName, getDefaultFontSize)
      rendition.current.themes.fontSize(getDefaultFontSize)
      dispatch(changeDefaultFontSize(getDefaultFontSize))
    }
  }, [currentBook, dispatch, fileName, getDefaultFontSize])

  useEffect(() => { // initFontFamily
    if (currentBook) {
      saveFontFamily(fileName, getDefaultFontFamily)
      rendition.current.themes.font(getDefaultFontFamily)
      dispatch(changeDefaultFontFamily(getDefaultFontFamily))
    }
  }, [currentBook, dispatch, fileName, getDefaultFontFamily])

  useEffect(() => { //initTheme
    if (currentBook) {
      let defaultTheme = getTheme(fileName)
      if (!defaultTheme) {
        defaultTheme = themeList.current[0].name
      }
      dispatch(changeDefaultTheme(defaultTheme))
      themeList.current.forEach((theme) => {
        rendition.current.themes.register(theme.name, theme.style)
      })
      rendition.current.themes.select(defaultTheme)
      setInitTheme(genGlobalThemeList(defaultTheme))
    }
  }, [currentBook, dispatch, fileName, setInitTheme])

  useEffect(() => {
    if (currentBook) {
      rendition.current.on('touchstart', registerTouchStart)
      rendition.current.on('touchend', registerTouchEnd)
    }
    return () => {
      if (currentBook) {
        rendition.current.off('touchstart', registerTouchStart)
        rendition.current.off('touchend', registerTouchEnd)
      }
    }
  }, [currentBook, registerTouchEnd, registerTouchStart])

  return (
    <>
      <div className="ebookReader">
        <div id="read"></div>
      </div>
    </>
  )
}
export default EbookReader
