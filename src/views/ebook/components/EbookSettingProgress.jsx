import React, { useRef, useCallback, useMemo } from 'react'
import { ProgressSettingWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeProgress, changeSection } from '../store/actionCreators'
import { useDisplay, useGetReadTime } from '../hooks'

const EbookSettingProgress = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('book')
  const isProgressLoading = useRef(false)

  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const bookAvailable = useSelector((state) =>
    state.getIn(['ebook', 'bookAvailable'])
  )
  const progress = useSelector((state) => state.getIn(['ebook', 'progress']))

  const section = useSelector((state) => state.getIn(['ebook', 'section']))

  const navigation = useSelector((state) =>
    state.getIn(['ebook', 'navigation'])
  )

  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const getSectionName = useMemo(() => {
    if (section && navigation) {
      const sectionInfo = currentBook.section(section)
      if (
        sectionInfo &&
        sectionInfo.href &&
        currentBook.navigation &&
        navigation
      ) {
        return navigation[section].label
      }
    }
  }, [currentBook, navigation, section])

  // const getReadTime = useMemo(() => {
  //   const time = getReadTimeByMinute(fileName)
  //   return t('haveRead', { time })
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fileName, t,settingVisible])

  const getReadTime = useGetReadTime()

  //   const refreshLocation = useRefreshLocation()
  const display = useDisplay()

  const displayProgress = useCallback(
    (progress) => {
      const cfi = currentBook.locations.cfiFromPercentage(progress / 100)
      display(cfi)
      //   currentBook.rendition.display(cfi).then(() => {
      //     refreshLocation()
      //   })
    },
    [currentBook, display]
  )

  const displaySection = useCallback(
    (section, cb) => {
      const sectionInfo = currentBook.section(section)
      if (sectionInfo && sectionInfo.href) {
        // currentBook.rendition.display(sectionInfo.href).then(() => {
        //   refreshLocation()
        //   if (cb) cb()
        // })
        display(sectionInfo.href)
        if (cb) cb()
      }
    },
    [currentBook, display]
  )

  const onProgressChange = useCallback(
    (progress) => {
      dispatch(changeProgress(progress))
      displayProgress(progress)
    },
    [dispatch, displayProgress]
  )

  const prevSection = useCallback(() => {
    if (section > 0 && !isProgressLoading.current) {
      isProgressLoading.current = true
      dispatch(changeSection(section - 1))
      displaySection(section - 1, () => {
        isProgressLoading.current = false
      })
    }
  }, [dispatch, displaySection, section])

  const nextSection = useCallback(() => {
    if (currentBook.spine.length - 1 > section && !isProgressLoading.current) {
      isProgressLoading.current = true
      dispatch(changeSection(section + 1))
      displaySection(section + 1, () => {
        isProgressLoading.current = false
      })
    }
  }, [currentBook, dispatch, displaySection, section])

  return (
    <CSSTransition
      in={menuVisible && settingVisible === 2}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <ProgressSettingWrapper progress={progress}>
        <div className="setting-progress">
          <div className="read-time-wrapper">
            <span className="read-time-text">{getReadTime}</span>
            <span className="icon-forward"></span>
          </div>
          <div className="progress-wrapper">
            <div
              className="progress-icon-wrapper"
              onClick={() => prevSection()}
            >
              <span className="icon-back"></span>
            </div>
            <input
              className="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              value={progress}
              disabled={!bookAvailable}
              onChange={(e) => onProgressChange(e.target.value)}
            />
            <div
              className="progress-icon-wrapper"
              onClick={() => nextSection()}
            >
              <span className="icon-forward"></span>
            </div>
          </div>
          <div className="text-wrapper">
            <span className="progress-section-text">{getSectionName}</span>
            <span className="progress-text">
              {bookAvailable ? progress + '%' : t('loading')}
            </span>
          </div>
        </div>
      </ProgressSettingWrapper>
    </CSSTransition>
  )
}

export default EbookSettingProgress
