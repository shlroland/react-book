import React, { memo, FC } from 'react'
import EbookMenuWrapper from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import EbookSettingFont from '../ebookSettingFont/EbookSettingFont'
import EbookSettingFontPopup from '../ebookSettingFont/EbookSettingFontPopup'
import EbookSettingTheme from '../ebookSettingTheme/EbookSettingTheme'
import EbookSettingProgress from '../ebookSettingProgress/EbookSettingProgress'
import EbookSlide from '../ebookSlide/EbookSlide'

const EbookTitle: FC = () => {
  const ebookStore = useEbookStore()

  return useObserver(() => (
    <>
      <CSSTransition
        in={ebookStore.menuVisible}
        timeout={300}
        classNames="slide-up"
        appear={true}
        unmountOnExit
      >
        <EbookMenuWrapper>
          <div
            className="icon-wrapper"
            onClick={() => ebookStore.changeSettingVisible(3)}
          >
            <span className="icon-menu"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => ebookStore.changeSettingVisible(2)}
          >
            <span className="icon-progress"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => ebookStore.changeSettingVisible(1)}
          >
            <span className="icon-bright"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => ebookStore.changeSettingVisible(0)}
          >
            <span className="icon-A"></span>
          </div>
        </EbookMenuWrapper>
      </CSSTransition>
      <EbookSettingFont></EbookSettingFont>
      <EbookSettingTheme></EbookSettingTheme>
      <EbookSettingProgress></EbookSettingProgress>
      <EbookSettingFontPopup></EbookSettingFontPopup>
      <EbookSlide></EbookSlide>
    </>
  ))
}

export default memo(EbookTitle)
