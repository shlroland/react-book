import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { EbookBookMarkWrapper } from '../style'
import BookMark from './BookMark'
import { useSelector, useDispatch } from 'react-redux'
import { realPx } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { changeIsBookmark } from '../store/actionCreators'
import { getBookmark, saveBookmark } from '@/utils/localStorage'
import classnames from 'classnames'

const EbookBookMark = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('book')

  const offsetY = useSelector((state) => state.getIn(['ebook', 'offsetY']))
  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const isBookmark = useSelector((state) =>
    state.getIn(['ebook', 'isBookmark'])
  )

  //   const settingVisible = useSelector((state) =>
  //     state.getIn(['ebook', 'settingVisible'])
  //   )

  //   const menuVisible = useSelector((state) =>
  //     state.getIn(['ebook', 'menuVisible'])
  //   )

  const isPaginating = useSelector((state) =>
    state.getIn(['ebook', 'isPaginating'])
  )

  const [setBookMark, setSetBookMark] = useState(false)
  const [top, setTop] = useState(35)
  const [text, setText] = useState(t('pulldownAddMark'))
  const [color, setColor] = useState('backgroundColor')
  const [fixedFlag, setFixedFlag] = useState(false)
  const cacheIsBookMark = useRef(false)
  const bookmark = useRef(null)

  const setAndSaveBookmark = useCallback(() => {
    if (currentBook) {
      bookmark.current = getBookmark(fileName)
      if (!bookmark.current) {
        bookmark.current = []
      }
      const currentLocation = currentBook.rendition.currentLocation()
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
      currentBook.getRange(cfiRange).then((range) => {
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
        console.log(bookmark.current)
        dispatch(changeIsBookmark(true))
        saveBookmark(fileName, bookmark.current)
      })
    }
  }, [currentBook, dispatch, fileName])

  const removeBookmark = useCallback(() => {
    if (currentBook) {
      const currentLocation = currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      if (bookmark.current) {
        bookmark.current = bookmark.current.filter((item) => item.cfi !== cfi)
        saveBookmark(fileName, bookmark.current)
      }
      console.log(bookmark.current)
      dispatch(changeIsBookmark(false))
    }
  }, [currentBook, dispatch, fileName])

  const fixHeight = useMemo(() => {
    return realPx(35)
  }, [])
  const threshold = useMemo(() => {
    return realPx(55)
  }, [])

  const effectFlag = useMemo(() => {
    if (isPaginating) {
      return false
    } else {
      return true
    }
  }, [isPaginating])

  useEffect(() => {
    cacheIsBookMark.current = isBookmark
    setFixedFlag(isBookmark)
    if (isBookmark) {
      setColor('slideLightTextColor')
    } else {
      setColor('backgroundColor')
    }
  }, [isBookmark])

  // 书签大于零未达到固定值
  useEffect(() => {
    if (offsetY > 0 && offsetY < fixHeight && effectFlag) {
      setSetBookMark(false)
      if (!isBookmark) {
        setText(t('pulldownAddMark'))
        setColor('backgroundColor')
      } else {
        setText(t('pulldownDeleteMark'))
        setColor('slideLightTextColor')
      }
    }
  }, [effectFlag, fixHeight, isBookmark, offsetY, setBookMark, t])

  // 书签达到固定值未达到临界值
  useEffect(() => {
    if (offsetY >= fixHeight && offsetY < threshold && effectFlag) {
      setSetBookMark(false)
      if (!isBookmark) {
        setTop(offsetY)
        setText(t('pulldownAddMark'))
        setColor('backgroundColor')
      } else {
        setTop(offsetY)
        setText(t('pulldownDeleteMark'))
        setColor('slideLightTextColor')
      }
    }
  }, [effectFlag, fixHeight, isBookmark, offsetY, t, threshold])

  // 书签达到临界值
  useEffect(() => {
    if (offsetY >= threshold && effectFlag) {
      setSetBookMark(true)
      if (!isBookmark) {
        setTop(offsetY)
        setText(t('releaseAddMark'))
        setColor('slideLightTextColor')
      } else {
        setTop(offsetY)
        setText(t('releaseDeleteMark'))
        setColor('backgroundColor')
      }
    }
  }, [effectFlag, isBookmark, offsetY, t, threshold])

  // 书签等于零
  useEffect(() => {
    if (offsetY === 0 && effectFlag) {
      if (!cacheIsBookMark.current) {
        if (setBookMark) {
          setFixedFlag(true)

          setAndSaveBookmark()
          setTimeout(() => {
            setTop(35)
            setText(t('releaseAddMark'))
            setColor('slideLightTextColor')
          }, 200)
        } else {
          setFixedFlag(false)
          setTimeout(() => {
            setTop(35)
            setText(t('pulldownAddMark'))
            setColor('backgroundColor')
          }, 200)
        }
      } else {
        if (setBookMark) {
          setFixedFlag(false)
          removeBookmark()
          //   dispatch(changeIsBookmark(false))
          setTimeout(() => {
            setTop(35)
            setText(t('pulldownAddMark'))
            setColor('backgroundColor')
          }, 200)
        } else {
          setFixedFlag(true)
          setTimeout(() => {
            setTop(35)
            setText(t('releaseAddMark'))
            setColor('slideLightTextColor')
          }, 200)
        }
      }
    }
  }, [
    dispatch,
    effectFlag,
    offsetY,
    removeBookmark,
    setAndSaveBookmark,
    setBookMark,
    t,
  ])

  return (
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
  )
}

export default EbookBookMark
