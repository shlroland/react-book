import React, {
  FC,
  memo,
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { useStore as useEbookStore, types } from '@/store/ebook'
import { EbookBookMarkWrapper } from './style'
import { useObserver } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import BookMark from './BookMark'
import { realPx } from '@/assets/styles'
import { reaction } from 'mobx'
import { bookmarkItem, getBookmark, saveBookmark } from '@/utils/localStorage'
import { isBook } from '@/utils/utils'

const EbookBookMark: FC = () => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')
  const [top, setTop] = useState(35)
  const [text, setText] = useState(t('pulldownAddMark'))
  const [fixedFlag, setFixedFlag] = useState(false)
  const [color, setColor] = useState('backgroundColor')
  const [setBookMark, setSetBookMark] = useState(false)
  const bookmark = useRef<bookmarkItem[]>([])

  const fixHeight = useMemo(() => {
    return realPx(35)
  }, [])
  const threshold = useMemo(() => {
    return realPx(55)
  }, [])

  const setAndSaveBookmark = useCallback(() => {
    if (isBook(ebookStore.currentBook)) {
      bookmark.current = getBookmark(ebookStore.fileName)
      if (!bookmark.current) {
        bookmark.current = []
      }
      const currentLocation = (ebookStore.currentBook.rendition.currentLocation() as unknown) as types.Location
      const cfibase = currentLocation.start.cfi
        .replace(/!.*/, '')
        .replace('epubcfi(', '')
      const cfistart = currentLocation.start.cfi
        .replace(/.*!/, '')
        .replace(/\)/, '')
      const cfiend = currentLocation.end.cfi
        .replace(/.*!/, '')
        .replace(/\)/, '')
      const cfiRange = `epubcfi(${cfibase}!,${cfistart},${cfiend})`
      const cfi = currentLocation.start.cfi
      ;((ebookStore.currentBook.getRange(cfiRange) as unknown) as Promise<
        Range
      >).then((range) => {
        let text = range.toString()
        text = text.replace(/\s\s/g, '')
        text = text.replace(/\r/g, '')
        text = text.replace(/\n/g, '')
        text = text.replace(/\t/g, '')
        text = text.replace(/\f/g, '')
        bookmark.current.push({
          cfi: cfi,
          text: text,
        })
        ebookStore.changeIsBookMark(true)
        saveBookmark(ebookStore.fileName, bookmark.current)
      })
    }
  }, [ebookStore])

  const removeBookmark = useCallback(() => {
    if (isBook(ebookStore.currentBook)) {
      const currentLocation = (ebookStore.currentBook.rendition.currentLocation() as unknown) as types.Location
      const cfi = currentLocation.start.cfi
      if (bookmark.current) {
        bookmark.current = bookmark.current.filter((item) => item.cfi !== cfi)
        saveBookmark(ebookStore.fileName, bookmark.current)
      }
      ebookStore.changeIsBookMark(false)
    }
  }, [ebookStore])

  useEffect(() => {
    const cleanupMark = reaction(
      () => ebookStore.isBookMark,
      (isBookMark) => {
        setFixedFlag(isBookMark)
        if (isBookMark) {
          setColor('slideLightTextColor')
        } else {
          setColor('backgroundColor')
        }
      },
      {
        fireImmediately: true,
      }
    )

    const cleanup = reaction(
      () => ({
        offsetY: ebookStore.offsetY,
        effectFlag: ebookStore.isPaginating,
      }),
      (prop) => {
        const { offsetY, effectFlag } = prop
        if (offsetY > 0 && offsetY < fixHeight && !effectFlag) {
          setSetBookMark(false)
          if (!ebookStore.isBookMark) {
            setText(t('pulldownAddMark'))
            setColor('backgroundColor')
          } else {
            setText(t('pulldownDeleteMark'))
            setColor('slideLightTextColor')
          }
        } else if (offsetY >= fixHeight && offsetY < threshold && !effectFlag) {
          setSetBookMark(false)
          if (!ebookStore.isBookMark) {
            setTop(offsetY)
            setText(t('pulldownAddMark'))
            setColor('backgroundColor')
          } else {
            setTop(offsetY)
            setText(t('pulldownDeleteMark'))
            setColor('slideLightTextColor')
          }
        } else if (offsetY >= threshold && !effectFlag) {
          setSetBookMark(true)
          if (!ebookStore.isBookMark) {
            setTop(offsetY)
            setText(t('releaseAddMark'))
            setColor('slideLightTextColor')
          } else {
            setTop(offsetY)
            setText(t('releaseDeleteMark'))
            setColor('backgroundColor')
          }
        } else if (offsetY === 0 && !effectFlag) {
          if (!ebookStore.isBookMark) {
            if (setBookMark) {
              setFixedFlag(true)
              //   ebookStore.changeIsBookMark(true)
              setAndSaveBookmark()
              setTimeout(() => {
                setTop(35)
                setText(t('releaseAddMark'))
                setColor('slideLightTextColor')
                setSetBookMark(false)
              }, 200)
            } else {
              setFixedFlag(false)
              setTimeout(() => {
                setTop(35)
                setText(t('pulldownAddMark'))
                setColor('backgroundColor')
                setSetBookMark(false)
              }, 200)
            }
          } else {
            if (setBookMark) {
              setFixedFlag(false)
              //   ebookStore.changeIsBookMark(false)
              removeBookmark()
              setTimeout(() => {
                setTop(35)
                setText(t('pulldownAddMark'))
                setColor('backgroundColor')
                setSetBookMark(false)
              }, 200)
            } else {
              setFixedFlag(true)
              setTimeout(() => {
                setTop(35)
                setText(t('releaseAddMark'))
                setColor('slideLightTextColor')
                setSetBookMark(false)
              }, 200)
            }
          }
        }
      }
    )
    return () => {
      cleanup()
      cleanupMark()
    }
  }, [
    ebookStore,
    fixHeight,
    removeBookmark,
    setAndSaveBookmark,
    setBookMark,
    t,
    threshold,
  ])

  return useObserver(() => (
    <EbookBookMarkWrapper top={top}>
      <div className="ebook-bookmark-text-wrapper">
        <div className="ebook-bookmark-down-wrapper">
          <span className="icon-down"></span>
        </div>
        <div className="ebook-bookmark-text">{text}</div>
      </div>
      <div
        className={classnames({
          'ebook-bookmark-icon-wrapper': true,
          beFixed: fixedFlag,
        })}
      >
        <BookMark color={color} beFixed={fixedFlag}></BookMark>
      </div>
    </EbookBookMarkWrapper>
  ))
}

export default memo(EbookBookMark)
