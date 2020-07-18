import React, { useEffect, useRef, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import Epub, { Book, Rendition } from 'epubjs'
import { useStore as useEbookStore } from '@/store/ebook'
import { useToggleMenuVisible } from '../hook'
import EbookReaderWrapper from './style'
import Hammer from 'hammerjs'

interface ParamTypes {
  fileName: string
}

const baseUrl = 'http://localhost:9900/epub/'

const EbookReader: React.FC = () => {
  const ebookStore = useEbookStore()
  const { fileName } = useParams<ParamTypes>()

  const currentRendition = useRef<Rendition | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)

  const toggleMenuVisible = useToggleMenuVisible()

  const prevPage = useCallback(() => {
    ;(currentRendition.current as Rendition).prev()
  }, [])

  const nextPage = useCallback(() => {
    ;(currentRendition.current as Rendition).next()
  }, [])

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
    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`
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
  }, [fileName, ebookStore])

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

  return useObserver(() => (
    <EbookReaderWrapper>
      <div className="ebook-reader-mask" ref={maskRef}></div>
      <div id="read"></div>
    </EbookReaderWrapper>
  ))
}

export default memo(EbookReader)
