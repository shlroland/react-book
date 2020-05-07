import React, { useState, useContext } from 'react'
import { SlideSettingWrapper } from '../style/index'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { useToggleMenuVisible } from '../hooks'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import EbookSlideContent from './EbookSlideContent'
import EbookSlideBookMark from './EbookSlideBookMark'
import KeepAlive from 'react-activation'
import { ThemeContext, ThemeProvider } from 'styled-components'
import EbookLoading from './EbookLoading'

const EbookSlide = () => {
  const { t } = useTranslation('book')
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const isPaginating = useSelector((state) =>
    state.getIn(['ebook', 'isPaginating'])
  )

  const themeContext = useContext(ThemeContext)

  const [tab, setTab] = useState(1)

  const toggleMenuVisible = useToggleMenuVisible()

  return menuVisible && settingVisible === 3 ? (
    <SlideSettingWrapper>
      <CSSTransition
        in={menuVisible && settingVisible === 3}
        timeout={500}
        classNames="fade"
        appear={true}
        unmountOnExit
      >
        <div className="mask" onClick={() => toggleMenuVisible()}></div>
      </CSSTransition>
      <CSSTransition
        in={settingVisible === 3}
        timeout={500}
        classNames="slide-right"
        appear
        unmountOnExit
      >
        <div className="content">
          {!isPaginating ? (
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
        {/* <div className="content-bg"></div> */}
      </CSSTransition>
    </SlideSettingWrapper>
  ) : null
}

export default EbookSlide
