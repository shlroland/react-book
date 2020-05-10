import React, { useState, useEffect } from 'react'
import { SearchBarWrapper } from './style'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'

const SearchBar = ({ offsetY }) => {
  const { t } = useTranslation('home')
  const [showSearchPage, setShowSearchPage] = useState(false)
  const [showShadow, setShowShadow] = useState(false)

  useEffect(() => {
    if (offsetY > 0) {
      setShowSearchPage(true)
      setShowShadow(false)
    } else {
      setShowSearchPage(false)
    }
  }, [offsetY])

  return (
    <SearchBarWrapper>
      <div
        className={classnames({
          'title-search-wrapper': true,
          'show-search': showSearchPage,
          'hide-shadow': !showShadow,
        })}
      >
        {' '}
        <CSSTransition
          in={!showSearchPage}
          timeout={250}
          classNames="title"
          unmountOnExit
        >
          <div className="title-search-page-wrapper">
            <span className="title-text">{t('title')}</span>
            <div className="icon-shake-wrapper">
              <span className="icon-shake icon"></span>
            </div>
          </div>
        </CSSTransition>
        <div
          className={classnames({
            'icon-back-wrapper': true,
            'show-search': showSearchPage,
          })}
        >
          <span className="icon-back icon"></span>
        </div>
        <div
          className={classnames({
            'search-wrapper': true,
            'show-search': showSearchPage,
          })}
        >
          <div
            className={classnames({
              'search-back-wrapper': true,
              'show-search': showSearchPage,
            })}
          >
            <span
              className={classnames({
                'icon-back': true,
                icon: true,
                'show-search': showSearchPage,
              })}
            ></span>
          </div>
          <div className="search-bg">
            <span className="icon-search icon"></span>
            <input type="text" className="search" placeholder={t('hint')} />
          </div>
        </div>
      </div>
      {/* <div className="hot-search-wrapper" >
            <hot-search ></hot-search>
            <div className="line"></div>
            <hot-search ></hot-search>
          </div> */}
    </SearchBarWrapper>
  )
}

export default SearchBar
