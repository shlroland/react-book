import React, { useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as actions } from '../store'
import Epub from 'epubjs'

const baseUrl = 'http://localhost:9900/epub/'

const { changeFileName } = actions

const EbookReader = () => {
  const dispatch = useDispatch()
  const { fileName } = useParams()

  const book = useRef(null)
  const rendition = useRef(null)

  const prevPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.prev()
    }
  },[])

  const nextPage = useCallback(() => {
    if (rendition.current) {
      rendition.current.next()
    }
  },[])

  useEffect(() => {
    dispatch(changeFileName(fileName))

    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`

    let touchStartX = 0
    let touchStartTime = 0

    book.current = new Epub(url)
    rendition.current = book.current.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      method: 'default',
    })
    rendition.current.display()
    rendition.current.on('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX
      touchStartTime = e.timeStamp
    })
    rendition.current.on('touchend', (e) => {
      const offsetX = e.changedTouches[0].clientX - touchStartX
      const time = e.timeStamp - touchStartTime
      if (time < 500 && offsetX > 40) {
        prevPage()
      } else if (time < 500 && offsetX < -40) {
        nextPage()
      }
      e.stopPropagation()
    })
  }, [dispatch, fileName, nextPage, prevPage])

  return (
    <>
      <div className="ebookReader">
        <div id="read"></div>
      </div>
    </>
  )
}
export default EbookReader
