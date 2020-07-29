import React, { FC, memo, useEffect } from 'react'
import { SearchBarWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import Scroll from '@/common/scroll/Scroll'
import { useLocalStore, useObserver } from 'mobx-react'
import { searchList } from '@/utils/mall'
import HotSearch from './HotSearch'
import { reaction } from 'mobx'

interface SearchBarProp {
  offsetY: number
  handleShowFlapCard: () => void
}

const SearchBar: FC<SearchBarProp> = (prop) => {
  const { t } = useTranslation('home')

  const store = useLocalStore(
    (source) => ({
      showSearchPage: false,
      showShadow: false,
      showHotSearch: false,
      hotSearchY: 0,
      setShowShadow(flag: boolean) {
        this.showShadow = flag
      },
      showSearchPageAndHotSearch() {
        this.showSearchPage = true
        this.showShadow = false
        this.showHotSearch = true
      },
      back() {
        if (this.showSearchPage) {
          if (source.offsetY <= 0) {
            this.showSearchPage = false
          } else {
            if (this.showHotSearch) {
              this.showSearchPage = false
              this.showShadow = true
              this.showHotSearch = false
            }
          }
        }
      },
      setHotSearchY(Y: number) {
        this.hotSearchY = Y
      },
    }),
    prop
  )

  useEffect(() => {
    const cleanup = reaction(
      () => store.hotSearchY,
      (hotSearchY) => {
        if (hotSearchY > 0) {
          store.setShowShadow(true)
        } else {
          store.setShowShadow(false)
        }
      }
    )
    return () => {
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useObserver(() => (
    <SearchBarWrapper>
      <div
        className={classnames({
          'title-search-wrapper': true,
          'show-search': store.showSearchPage,
          'hide-shadow': !store.showShadow,
        })}
      >
        <CSSTransition
          in={!store.showSearchPage}
          timeout={250}
          classNames="title"
          unmountOnExit
        >
          <div className="title-search-page-wrapper">
            <span className="title-text">{t('title')}</span>
            <div className="icon-shake-wrapper" onClick={() => prop.handleShowFlapCard()}>
              <span className="icon-shake icon"></span>
            </div>
          </div>
        </CSSTransition>
        <div
          className={classnames({
            'icon-back-wrapper': true,
            'show-search': store.showSearchPage,
          })}
          onClick={() => store.back()}
        >
          <span className="icon-back icon"></span>
        </div>
        <div
          className={classnames({
            'search-wrapper': true,
            'show-search': store.showSearchPage,
          })}
        >
          <div
            className={classnames({
              'search-back-wrapper': true,
              'show-search': store.showSearchPage,
            })}
          >
            <span
              className={classnames({
                'icon-back': true,
                icon: true,
                'show-search': store.showSearchPage,
              })}
            ></span>
          </div>
          <div className="search-bg">
            <span className="icon-search icon"></span>
            <input
              type="text"
              className="search"
              placeholder={t('hint')}
              onClick={() => store.showSearchPageAndHotSearch()}
            />
          </div>
        </div>
      </div>
      <CSSTransition
        in={store.showSearchPage && store.showHotSearch}
        timeout={500}
        classNames="hotSearch"
        unmountOnExit
      >
        <Scroll top={52} onScroll={(Y) => store.setHotSearchY(Y)}>
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
  ))
}

export default memo(SearchBar)
