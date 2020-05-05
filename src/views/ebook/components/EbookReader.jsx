import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Epub from 'epubjs'
import {
  changeCurrentBook,
  changeDefaultFontFamily,
  changeDefaultFontSize,
  changeDefaultTheme,
  changeBookAvailable,
  changeFileName,
  changeMetadata,
  changeCover,
  changeNavigation,
  changePagelist,
  changeIsPaginating,
  changeOffsety,
} from '../store/actionCreators'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveMetadata,
} from '@/utils/localStorage'
import { genThemeList } from '@/utils/book'
import { useTranslation } from 'react-i18next'
import ThemeContext from '../Context'
import { genGlobalThemeList } from '@/utils/book'
import { getLocation } from '../../../utils/localStorage'
import { useDisplay, useRefreshLocation, useToggleMenuVisible } from '../hooks'
import { EbookReaderWrapper } from '../style'
import Hammer from 'hammerjs'

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
    isPaginating,
    settingVisible
  } = useSelector((state) => state.get('ebook').toJS())

  const rendition = useRef(null)
  const themeList = useRef(genThemeList(t))
  const navItems = useRef(null)
  const pageItems = useRef(null)
  const maskRef = useRef(null)

  const display = useDisplay()
  const refreshLocation = useRefreshLocation()
  const toggleMenuVisible = useToggleMenuVisible()

  const prevPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.prev().then(() => {
        refreshLocation()
        if (menuVisible) {
          toggleMenuVisible()
        }
      })
    }
  }, [menuVisible, refreshLocation, toggleMenuVisible])

  const nextPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.next().then(() => {
        if (menuVisible) {
          toggleMenuVisible()
        }
        refreshLocation()
      })
    }
  }, [menuVisible, refreshLocation, toggleMenuVisible])

  const handleTapEvent = useCallback(
    (ev) => {
      const padLeft = window.innerWidth * 0.25
      const padRight = window.innerWidth * 0.75
      const x = ev.center.x
      if (x < padLeft) {
        prevPage()
      } else if (x > padRight) {
        nextPage()
      } else {
        toggleMenuVisible()
      }
    },
    [nextPage, prevPage, toggleMenuVisible]
  )

  const handleSwipeEvent = useCallback(
    (ev) => {
      if (ev.type === 'swipeleft') {
        nextPage()
      } else if (ev.type === 'swiperight') {
        prevPage()
      }
    },
    [nextPage, prevPage]
  )

  const handlePanMoveEvent = useCallback(
    (ev) => {
      if (settingVisible > 0 || menuVisible) {
        return
      }
      dispatch(
        changeOffsety(ev.deltaY > 0 ? (ev.deltaY < 150 ? ev.deltaY : 150) : 0)
      )
    },
    [dispatch, menuVisible, settingVisible]
  )

  const handlePanEndEvent = useCallback(
    (ev) => {
      dispatch(changeOffsety(0))
    },
    [dispatch]
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
      console.log('rendition')
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
    }
  }, [currentBook, dispatch])

  useEffect(() => {
    const location = getLocation(fileName)
    display(location)
  }, [display, fileName])

  useEffect(() => {
    // initFontSize
    if (currentBook) {
      saveFontSize(fileName, getDefaultFontSize)
      rendition.current.themes.fontSize(getDefaultFontSize)
      dispatch(changeDefaultFontSize(getDefaultFontSize))
    }
  }, [currentBook, dispatch, fileName, getDefaultFontSize])

  useEffect(() => {
    // initFontFamily
    if (currentBook) {
      saveFontFamily(fileName, getDefaultFontFamily)
      rendition.current.themes.font(getDefaultFontFamily)
      dispatch(changeDefaultFontFamily(getDefaultFontFamily))
    }
  }, [currentBook, dispatch, fileName, getDefaultFontFamily])

  useEffect(() => {
    //initTheme
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
      const hammer = new Hammer(maskRef.current)
      hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })
      hammer.on('tap', handleTapEvent)
      hammer.on('swipeleft swiperight', handleSwipeEvent)
      hammer.on('pandown panup', handlePanMoveEvent)
      hammer.on('panend', handlePanEndEvent)

      return () => {
        hammer.off('tap', handleTapEvent)
        hammer.off('swipeleft swiperight', handleSwipeEvent)
        hammer.off('pandown panup', handlePanMoveEvent)
        hammer.on('panend', handlePanEndEvent)
      }
    }
  }, [
    currentBook,
    handlePanEndEvent,
    handlePanMoveEvent,
    handleSwipeEvent,
    handleTapEvent,
  ])

  useEffect(() => {
    if (currentBook) {
      currentBook.loaded.metadata.then((metadata) => {
        dispatch(changeMetadata(metadata))
        saveMetadata(metadata)
      })
      currentBook.loaded.cover.then((cover) => {
        currentBook.archive.createUrl(cover).then((url) => {
          dispatch(changeCover(url))
        })
      })
    }
  }, [currentBook, dispatch])

  useEffect(() => {
    // 解析目录
    if (currentBook) {
      currentBook.loaded.navigation.then((nav) => {
        const navItem = (function flatten(arr) {
          return [].concat(...arr.map((v) => [v, ...flatten(v.subitems)]))
        })(nav.toc)
        function find(item, v = 0) {
          const parent = navItem.filter((it) => it.id === item.parent)[0]
          return !item.parent ? v : parent ? find(parent, ++v) : v
        }
        navItem.forEach((item) => {
          item.level = find(item)
          item.total = 0
          item.pagelist = []
          if (item.href.match(/^(.*)\.html$/)) {
            item.idhref = item.href.match(/^(.*)\.html$/)[1]
          } else if (item.href.match(/^(.*)\.xhtml$/)) {
            item.idhref = item.href.match(/^(.*)\.xhtml$/)[1]
          }
        })
        navItems.current = navItem
      })
    }
  }, [currentBook, dispatch])

  useEffect(() => {
    // pagination
    if (currentBook) {
      currentBook.ready
        .then(() => {
          console.log('pagination')
          return currentBook.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(fileName) / 16)
          )
        })
        .then((locations) => {
          pageItems.current = locations
          dispatch(changeIsPaginating(false))
          dispatch(changeBookAvailable(true))
          refreshLocation()
        })
    }
  }, [currentBook, dispatch, fileName, refreshLocation])

  useEffect(() => {
    if (!isPaginating) {
      const navigation = navItems.current
      const pagelist = pageItems.current
      pagelist.forEach((location) => {
        const loc = location.match(/\[(.*)\]!/)[1]
        navigation.forEach((item) => {
          if (item.idhref && item.idhref.indexOf(loc) >= 0) {
            item.pagelist.push(location)
          }
        })
        let currentPage = 1
        navigation.forEach((item, index) => {
          if (index === 0) {
            item.page = 1
          } else {
            item.page = currentPage
          }
          currentPage += item.pagelist.length + 1
        })
      })
      dispatch(changeNavigation(navigation))
      dispatch(changePagelist(pagelist))
    }
  }, [dispatch, isPaginating])

  return (
    <EbookReaderWrapper>
      <div className="ebook-reader-mask" ref={maskRef}></div>
      <div className="read-wrapper">
        <div id="read"></div>
      </div>
    </EbookReaderWrapper>
  )
}
export default EbookReader
