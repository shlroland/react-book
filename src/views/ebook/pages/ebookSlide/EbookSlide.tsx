import React, { FC, useState, useContext } from 'react'
import { observer } from 'mobx-react'
import { ThemeContext, ThemeProvider } from 'styled-components'
import { SlideSettingWrapper } from './style'
import { useStore as useEbookStore } from '@/store/ebook'
import { CSSTransition } from 'react-transition-group'
import { useToggleMenuVisible } from '../hooks'
import EbookLoading from './EbookLoading'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import KeepAlive from 'react-activation'
import EbookSlideContent from './EbookSlideContent'
import EbookSlideBookMark from './EbookSlideBookMark'

const EbookSlide: FC = observer(() => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')
  const toggleMenuVisible = useToggleMenuVisible()
  const themeContext = useContext(ThemeContext)

  const [tab, setTab] = useState<1 | 2>(1)

  return ebookStore.slideVisible ? (
    <SlideSettingWrapper>
      <CSSTransition
        in={ebookStore.slideVisible}
        timeout={500}
        classNames="fade"
        appear={true}
        unmountOnExit
      >
        <div className="mask" onClick={() => toggleMenuVisible()}></div>
      </CSSTransition>
      <CSSTransition
        in={ebookStore.slideVisible}
        timeout={500}
        classNames="slide-right"
        appear
        unmountOnExit
      >
        <div className="content">
          {!ebookStore.isPaginating ? (
            <div className="content-page-wrapper">
              <div className="content-page">
                <KeepAlive>
                  <ThemeProvider theme={themeContext}>
                    {tab === 1 ? (
                      <EbookSlideContent></EbookSlideContent>
                    ) : (
                      <EbookSlideBookMark></EbookSlideBookMark>
                    )}
                  </ThemeProvider>
                </KeepAlive>
              </div>
              <div className="content-page-tab">
                <div
                  className={classNames({
                    'content-page-tab-item': true,
                    selected: tab === 1,
                  })}
                  onClick={() => setTab(1)}
                >
                  {t('navigation')}
                </div>
                <div
                  className={classNames({
                    'content-page-tab-item': true,
                    selected: tab === 2,
                  })}
                  onClick={() => setTab(2)}
                >
                  {t('bookmark')}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty">
              <EbookLoading></EbookLoading>
            </div>
          )}
        </div>
      </CSSTransition>
    </SlideSettingWrapper>
  ) : null
})

export default EbookSlide
