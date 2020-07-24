import React, { useRef, memo } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import { CSSTransition } from 'react-transition-group'
import ProgressSettingWrapper from './style'
import { useTranslation } from 'react-i18next'
import { useDisplay, useRefreshLocation } from '../hooks'
import { Book } from 'epubjs'

const EbookSettingProgress = () => {
  const ebookStore = useEbookStore()

  const isProgressLoading = useRef(false)

  const { t } = useTranslation('book')

  const display = useDisplay()
  const refreshLocation = useRefreshLocation()

  const displaySection = (section: number) => {
    const sectionInfo = (ebookStore.currentBook as Book).section(section)
    if (sectionInfo && sectionInfo.href) {
      return display(sectionInfo.href)
    }
  }

  const displayProgress = (progress: number) => {
    const cfi = (ebookStore.currentBook as Book).locations.cfiFromPercentage(
      progress / 100
    )
    display(cfi)
  }

  const prevSection = async () => {
    if (ebookStore.section > 0 && !isProgressLoading.current) {
      isProgressLoading.current = true
      ebookStore.changeSection(ebookStore.section - 1)
      await displaySection(ebookStore.section - 1)
      refreshLocation()
      isProgressLoading.current = false
    }
  }

  const nextSection = async () => {
    if (
      (ebookStore.currentBook as Book).spine.last().index >
        ebookStore.section &&
      !isProgressLoading.current
    ) {
      isProgressLoading.current = true
      ebookStore.changeSection(ebookStore.section + 1)
      await displaySection(ebookStore.section + 1)
      refreshLocation()
      isProgressLoading.current = false
    }
  }

  const onProgressChange = (progress: number) => {
    ebookStore.changeProgress(progress)
    displayProgress(progress)
  }

  return useObserver(() => (
    <CSSTransition
      in={ebookStore.progressSettingVisible}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <ProgressSettingWrapper progress={ebookStore.progress}>
        <div className="setting-progress">
          <div className="read-time-wrapper">
            <span className="read-time-text">
              {t('haveRead', { time: ebookStore.readTime })}
            </span>
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
              value={ebookStore.progress}
              disabled={!ebookStore.bookAvailable}
              onChange={(e) => onProgressChange(+e.target.value)}
            />
            <div
              className="progress-icon-wrapper"
              onClick={() => nextSection()}
            >
              <span className="icon-forward"></span>
            </div>
          </div>
          <div className="text-wrapper">
            <span className="progress-section-text">
              {ebookStore.sectionName}
            </span>
            <span className="progress-text">
              （
              {ebookStore.bookAvailable
                ? ebookStore.progress + '%'
                : t('loading')}
              ）
            </span>
          </div>
        </div>
      </ProgressSettingWrapper>
    </CSSTransition>
  ))
}

export default memo(EbookSettingProgress)
