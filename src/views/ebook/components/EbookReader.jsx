import React, { useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as actions } from '../store'
import Epub from 'epubjs'
import {
  changeSettingVisible,
  changeCurrentBook,
  changeFontFamilyVisible,
} from '../store/actionCreators'

const baseUrl = 'http://localhost:9900/epub/'

const { changeFileName, changeMenuVisible } = actions

const EbookReader = () => {
  const dispatch = useDispatch()
  const { fileName } = useParams()

  const { menuVisible, currentBook } = useSelector((state) =>
    state.get('ebook').toJS()
  )

  const rendition = useRef(null)
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

  useEffect(() => {
    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`
    const constant = new Epub(url)
    dispatch(changeFileName(fileName))
    dispatch(changeCurrentBook(constant))
    // if (currentBook) {

    // }
    // rendition.current = constant.renderTo('read', {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   method: 'default',
    // })
    // rendition.current.display()
  }, [dispatch, fileName])

  useEffect(() => {
    if (currentBook) {
      console.log(currentBook)
      rendition.current = currentBook.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default',
      })
      rendition.current.display()
    }
  }, [currentBook])

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
