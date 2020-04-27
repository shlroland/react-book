import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as actions } from '../store'
import Epub from 'epubjs'

const baseUrl = 'http://localhost:9900/epub/'

const { changeFileName, changeMenuVisible } = actions

const EbookReader = () => {
  const dispatch = useDispatch()
  const { fileName } = useParams()
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )

  const book = useRef(null)
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
      } else if (time < 500 && offsetX < -40) {
        nextPage()
      } else {
        toggleMenuVisible()
      }
      e.stopPropagation()
    },
    [nextPage, prevPage, toggleMenuVisible]
  )

  useEffect(() => {
    dispatch(changeFileName(fileName))
    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`
    book.current = new Epub(url)
    rendition.current = book.current.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      method: 'default',
    })
    rendition.current.display()
  }, [dispatch, fileName])

  useEffect(() => {
    rendition.current.on('touchstart', registerTouchStart)
    rendition.current.on('touchend', registerTouchEnd)
    return () => {
      rendition.current.off('touchstart', registerTouchStart)
      rendition.current.off('touchend', registerTouchEnd)
    }
  }, [registerTouchEnd, registerTouchStart])

  return (
    <>
      <div className="ebookReader">
        <div id="read"></div>
      </div>
    </>
  )
}
export default EbookReader
