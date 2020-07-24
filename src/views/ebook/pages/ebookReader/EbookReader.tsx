import React, { useEffect, useRef, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import Epub, { Book, Rendition } from 'epubjs'
import { useStore as useEbookStore } from '@/store/ebook'
import EbookReaderWrapper from './style'
import Hammer from 'hammerjs'
import { useTranslation } from 'react-i18next'
import { useParseBook, useInit } from './hooks'
import { useToggleMenuVisible, useRefreshLocation } from '../hooks'
interface ParamTypes {
  fileName: string
}

const EbookReader: React.FC = () => {
  const ebookStore = useEbookStore()
  const { fileName } = useParams<ParamTypes>()
  const { t } = useTranslation('book')
  const refreshLocation = useRefreshLocation()

  const currentRendition = useRef<Rendition | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)

  const toggleMenuVisible = useToggleMenuVisible()

  const prevPage = useCallback(() => {
    ;(currentRendition.current as Rendition).prev().then(() => {
      refreshLocation()
      if (ebookStore.menuVisible) {
        toggleMenuVisible()
      }
    })
  }, [ebookStore, refreshLocation, toggleMenuVisible])

  const nextPage = useCallback(() => {
    ;(currentRendition.current as Rendition).next().then(() => {
      refreshLocation()
      if (ebookStore.menuVisible) {
        toggleMenuVisible()
      }
    })
  }, [ebookStore, refreshLocation, toggleMenuVisible])

  const handleTapEvent = useCallback(
    (ev: HammerInput) => {
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
    (ev: HammerInput) => {
      if (ev.type === 'swipeleft') {
        nextPage()
      } else if (ev.type === 'swiperight') {
        prevPage()
      }
    },
    [nextPage, prevPage]
  )

  useEffect(() => {
    const url = `${process.env.REACT_APP_BOOK_URL}/${fileName
      .split('|')
      .join('/')}.epub`
    ebookStore.changeFileName(fileName)
    ebookStore.changeCurrentBook(Epub(url))
    currentRendition.current = (ebookStore.currentBook as Book).renderTo(
      'read',
      {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    )
    currentRendition.current.display()
  }, [fileName, ebookStore, t])

  useEffect(() => {
    const hammer = new Hammer(maskRef.current as HTMLDivElement)
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    hammer.on('tap', handleTapEvent)
    hammer.on('swipeleft swiperight', handleSwipeEvent)
    return () => {
      hammer.off('tap', handleTapEvent)
      hammer.off('swipeleft swiperight', handleSwipeEvent)
    }
  }, [handleSwipeEvent, handleTapEvent])
  
  useInit()
  useParseBook()

  return useObserver(() => (
    <EbookReaderWrapper>
      <div className="ebook-reader-mask" ref={maskRef}></div>
      <div id="read"></div>
    </EbookReaderWrapper>
  ))
}

export default memo(EbookReader)
