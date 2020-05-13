import React, { useState, useEffect, useCallback } from 'react'
import { SearchBarWrapper } from './style'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import HotSearch from './HotSearch'
import { searchList } from '@/utils/store'
import Scroll from '@/common/scroll'
import { useDispatch } from 'react-redux'
import { changeShowFlapCard } from './store/actionCreators'

const SearchBar = ({ offsetY: homeY }) => {
  const { t } = useTranslation('home')
  const dispatch = useDispatch()
  const [showSearchPage, setShowSearchPage] = useState(false)
  const [showShadow, setShowShadow] = useState(false)
  const [showHotSearch, setShowHotSearch] = useState(false)
  const [hotSearchY, setHotSearchY] = useState(0)

  const showSearchPageAndHotSearch = useCallback(() => {
    setShowSearchPage(true)
    setShowShadow(false)
    setShowHotSearch(true)
  }, [])

  const back = useCallback(() => {
    if (showSearchPage) {
      if (homeY <= 0) {
        setShowSearchPage(false)
      } else {
        if (showHotSearch) {
          setShowHotSearch(false)
          setShowSearchPage(false)
          setShowShadow(true)
        }
      }
    }
  }, [homeY, showHotSearch, showSearchPage])

  const showFlapCard = useCallback(()=>{
    dispatch(changeShowFlapCard(true))
  },[dispatch])

  useEffect(() => {
    if (homeY > 0) {
      setShowSearchPage(true)
      setShowShadow(true)
    } else {
      setShowSearchPage(false)
      setShowShadow(true)
    }
  }, [homeY])

  useEffect(() => {
    if (hotSearchY > 0) {
      setShowShadow(true)
    } else {
      setShowShadow(false)
    }
  }, [hotSearchY])

  return (
    <SearchBarWrapper>
      <div
        className={classnames({
          'title-search-wrapper': true,
          'show-search': showSearchPage,
          'hide-shadow': !showShadow,
        })}
      >
        <CSSTransition
          in={!showSearchPage}
          timeout={250}
          classNames="title"
          unmountOnExit
        >
          <div className="title-search-page-wrapper">
            <span className="title-text">{t('title')}</span>
            <div className="icon-shake-wrapper" onClick={()=>showFlapCard()}>
              <span className="icon-shake icon"></span>
            </div>
          </div>
        </CSSTransition>
        <div
          className={classnames({
            'icon-back-wrapper': true,
            'show-search': showSearchPage,
          })}
          onClick={() => back()}
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
            <input
              type="text"
              className="search"
              placeholder={t('hint')}
              onClick={() => showSearchPageAndHotSearch()}
            />
          </div>
        </div>
      </div>
      <CSSTransition
        in={showSearchPage && showHotSearch}
        timeout={500}
        classNames="hotSearch"
        unmountOnExit
      >
        <Scroll top={52} onScroll={(Y) => setHotSearchY(Y)}>
          <div className="hot-search-wrapper">
            <HotSearch
              label={t('hotSearch')}
              btn={t('change')}
              hotSearch={searchList.hotSearch}
            ></HotSearch>
            <div className="line"></div>
            <HotSearch
              label={t('historySearch')}
              btn={t('clear')}
              hotSearch={searchList.historySearch}
            ></HotSearch>
          </div>
        </Scroll>
      </CSSTransition>
    </SearchBarWrapper>
  )
}

export default SearchBar
