import React, { FC, memo, useState, useCallback, useMemo } from 'react'
import { ShelfSearchWrapper } from './style'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import { saveLocale } from '@/utils/localStorage'
import { CSSTransition } from 'react-transition-group'

interface ShelfSearchProp {
  onSearchClick: () => void
  onSearchCancel: () => void
  onSearchTabClick: (id: number) => void
}

interface tabsItem {
  id: number
  text: string
  selected: boolean
}

const ShelfSearch: FC<ShelfSearchProp> = observer((props) => {
  const { onSearchClick, onSearchTabClick, onSearchCancel } = props

  const { t, i18n } = useTranslation('shelf')
  const [ifShowCancel, setIfShowCancel] = useState(false)
  const [ifHideShadow, setIfHideShadow] = useState(true)
  const [ifShowClear, setIfShowClear] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [lang, setLang] = useState(i18n.language)
  const [tabs, setTabs] = useState<tabsItem[]>([
    {
      id: 1,
      text: t('default'),
      selected: true,
    },
    {
      id: 2,
      text: t('progress'),
      selected: false,
    },
    {
      id: 3,
      text: t('purchase'),
      selected: false,
    },
  ])

  const onTabClick = (item: tabsItem) => {
    tabs.forEach((tab) => {
      if (tab.id === item.id) {
        tab.selected = true
      } else {
        tab.selected = false
      }
    })
    onSearchTabClick(item.id)
    setTabs([...tabs])
  }

  const onCancel = () => {
    setIfShowCancel(false)
    onSearchCancel()
  }

  const checkSearchText = useCallback((e) => {
    console.log(e)
  }, [])

  const changeLang = () => {
    if (lang === 'cn') {
      i18n.changeLanguage('en')
      saveLocale('en')
      setLang('en')
    } else {
      i18n.changeLanguage('cn')
      saveLocale('cn')
      setLang('cn')
    }
  }

  const handleOnSearchClick = () => {
    setIfShowCancel(true)
    onSearchClick()
  }

  return (
    <ShelfSearchWrapper
      className={classnames({
        'search-top': ifShowCancel,
        'hide-shadow': ifHideShadow,
      })}
    >
      <div
        className={classnames({
          'shelf-search': true,
          'search-top': ifShowCancel,
        })}
      >
        <div className="search-wrapper">
          <div className="icon-search-wrapper">
            <span className="icon-search icon"></span>
          </div>
          <div className="search-input-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder={t('search')}
              onChange={(e) => checkSearchText(e)}
              onClick={handleOnSearchClick}
              value={searchText}
            />
          </div>
          {ifShowClear ? (
            <div className="icon-clear-wrapper">
              <span className="icon-close-circle-fill icon"></span>
            </div>
          ) : null}
        </div>
        {!ifShowCancel ? (
          <div className="icon-clock-wrapper" onClick={() => changeLang()}>
            {lang === 'cn' ? (
              <span className="icon-cn icon"></span>
            ) : lang === 'en' ? (
              <span className="icon-en icon"></span>
            ) : null}
          </div>
        ) : (
          <div className="cancel-btn-wrapper" onClick={onCancel}>
            <span className="cancel-btn">{t('cancel')}</span>
          </div>
        )}
      </div>
      <CSSTransition
        in={ifShowCancel}
        timeout={500}
        classNames="shelf-tab-slide-up"
        appear={true}
        unmountOnExit
      >
        <div className="tab-wrapper">
          {tabs &&
            tabs.map((item) => {
              return (
                <div
                  className="tab-item"
                  key={item.id}
                  onClick={() => onTabClick(item)}
                >
                  <span
                    className={classnames('tab-item-text', {
                      'is-selected': item.selected,
                    })}
                  >
                    {item.text}
                  </span>
                </div>
              )
            })}
        </div>
      </CSSTransition>
    </ShelfSearchWrapper>
  )
})

export default memo(ShelfSearch)
