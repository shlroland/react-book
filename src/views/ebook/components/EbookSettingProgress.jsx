import React, { useRef, useCallback } from 'react'
import { ProgressSettingWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeProgress } from '../store/actionCreators'

const EbookSettingProgress = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('book')
  const progressDom = useRef(null)

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

  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const displayProgress = useCallback((progress) => {
    const cfi = currentBook.locations.cfiFromPercentage(progress / 100)
    currentBook.rendition.display(cfi)
  }, [currentBook])

  const onProgressChange = useCallback(
    (progress) => {
      dispatch(changeProgress(progress))
      updateProgressBg(progress)
      displayProgress(progress)
    },
    [dispatch, displayProgress]
  )

  const updateProgressBg = (progress) => {
    progressDom.current.style.backgroundSize = `${progress}% 100%`
  }

  return (
    <CSSTransition
      in={menuVisible && settingVisible === 2}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <ProgressSettingWrapper>
        <div className="setting-progress">
          <div className="read-time-wrapper">
            <span className="read-time-text">{}</span>
            <span className="icon-forward"></span>
          </div>
          <div className="progress-wrapper">
            <div className="progress-icon-wrapper">
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
              ref={progressDom}
              onChange={(e) => onProgressChange(e.target.value)}
            />
            <div className="progress-icon-wrapper">
              <span className="icon-forward"></span>
            </div>
          </div>
          <div className="text-wrapper">
            <span className="progress-section-text">{}</span>
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
