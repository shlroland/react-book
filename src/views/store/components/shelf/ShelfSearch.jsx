import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ShelfSearchWrapper } from './style'
import classnames from 'classnames'
import { saveLocale } from '@/utils/localStorage'
import { set } from 'immutable'

const ShelfSearch = () => {
  const { t, i18n } = useTranslation('shelf')
  const [ifShowCancel, setIfShowCancel] = useState(false)
  const [ifHideShadow, setIfHideShadow] = useState(true)
  const [ifShowClear, setIfShowClear] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [lang, setLang] = useState(i18n.language)
  const checkSearchText = useCallback((e) => {
    console.log(e)
  }, [])

  const onSearchClick = useCallback(() => {}, [])

  const changeLang = useCallback(() => {
    if (lang === 'cn') {
      i18n.changeLanguage('en')
      saveLocale('en')
      setLang('en')
    } else {
      i18n.changeLanguage('cn')
      saveLocale('cn')
      setLang('cn')
    }
  }, [i18n, lang])

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
              onClick={() => onSearchClick()}
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
          <div className="cancel-btn-wrapper">
            <span className="cancel-btn">{t('cancel')}</span>
          </div>
        )}
      </div>
    </ShelfSearchWrapper>
  )
}

export default ShelfSearch
