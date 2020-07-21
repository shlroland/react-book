import React, { useEffect, useRef, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { reaction, toJS } from 'mobx'
import Epub, { Book, Rendition, Contents } from 'epubjs'
import { useStore as useEbookStore } from '@/store/ebook'
import EbookReaderWrapper from './style'
import Hammer from 'hammerjs'
import { useTranslation } from 'react-i18next'
import { ebookItemType } from '@/utils/book'
import { useParseBook } from './hooks'
import { useToggleMenuVisible } from '../hooks'
interface ParamTypes {
  fileName: string
}

// const baseUrl = 'http://localhost:9900/epub/'

const EbookReader: React.FC = () => {
  const ebookStore = useEbookStore()
  const { fileName } = useParams<ParamTypes>()
  const { t } = useTranslation('book')

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
    const url = `${process.env.REACT_APP_BOOK_URL}/${fileName
      .split('|')
      .join('/')}.epub`
    ebookStore.changeFileName(fileName)
    ebookStore.changeCurrentBook(Epub(url))
    ebookStore.initDefaultFontSize()
    ebookStore.initDefaultFontFamily()
    ebookStore.initEbookTheme(t)

    currentRendition.current = (ebookStore.currentBook as Book).renderTo(
      'read',
      {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    )
    currentRendition.current.hooks.content.register((contents: Contents) => {
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

    const cleanUpFontSize = reaction(
      () => ebookStore.defaultFontSize,
      (fontSize) => {
        ;(currentRendition.current as Rendition).themes.fontSize(
          fontSize + 'px'
        )
      },
      {
        fireImmediately: true,
      }
    )

    const cleanUpFontFamily = reaction(
      () => ebookStore.defaultFontFamily,
      (fontFamily) => {
        ;(currentRendition.current as Rendition).themes.font(fontFamily)
      },
      {
        fireImmediately: true,
      }
    )

    const cleanUpTheme = reaction(
      () => ebookStore.ebookTheme,
      (theme) => {
        const { color, background } = toJS(
          ebookStore.ebookThemeList.find((item) => item.name === theme)
        ) as ebookItemType
        console.log(color, background)
        ;(currentRendition.current as Rendition).themes.override('color', color)
        ;(currentRendition.current as Rendition).themes.override(
          'background',
          background
        )
      },
      {
        fireImmediately: true,
      }
    )

    currentRendition.current.display()
    return () => {
      cleanUpFontSize()
      cleanUpFontFamily()
      cleanUpTheme()
    }
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

  useParseBook()

  return useObserver(() => (
    <EbookReaderWrapper>
      <div className="ebook-reader-mask" ref={maskRef}></div>
      <div id="read"></div>
    </EbookReaderWrapper>
  ))
}

export default memo(EbookReader)
