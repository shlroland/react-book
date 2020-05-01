import React, { useCallback } from 'react'
import { FontFamilySettingWrapper, PopupListWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { FONT_FAMILY } from '@/utils/book'
import classnames from 'classnames'
import {
  changeFontFamilyVisible,
  changeDefaultFontFamily,
} from '../store/actionCreators'
import { saveFontFamily } from '../../../utils/localStorage'
import { useTranslation } from 'react-i18next'

const PopupList = () => {
  const dispatch = useDispatch()

  const defaultFontFamily = useSelector((state) =>
    state.getIn(['ebook', 'defaultFontFamily'])
  )
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const fileName = useSelector((state) =>
    state.getIn(['ebook', 'fileName'])
  )

  const setFontFamily = useCallback(
    (font) => {
      dispatch(changeDefaultFontFamily(font))
      saveFontFamily(fileName,font)
      if (currentBook) {
        if (font === 'Default') {
          currentBook.rendition.themes.font('Times New Roman')
        } else {
          currentBook.rendition.themes.font(font)
        }
      }
    },
    [currentBook, dispatch, fileName]
  )
  return (
    <PopupListWrapper>
      {FONT_FAMILY.map((item, index) => {
        return (
          <div
            className="ebook-popup-item"
            key={index}
            onClick={() => setFontFamily(item.font)}
          >
            <div
              className={classnames({
                'ebook-popup-item-text': true,
                selected: defaultFontFamily === item.font,
              })}
            >
              {item.font}
            </div>
            <div
              className="ebook-popup-item-check"
              style={{
                display: defaultFontFamily === item.font ? 'block' : 'none',
              }}
            >
              <span className="icon-check"></span>
            </div>
          </div>
        )
      })}
    </PopupListWrapper>
  )
}

const EbookSettingPopup = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('book')

  const fontFamilyVisible = useSelector((state) =>
    state.getIn(['ebook', 'fontFamilyVisible'])
  )

  const hideFontFamilyVisible = useCallback(() => {
    dispatch(changeFontFamilyVisible(false))
  }, [dispatch])

  return (
    <CSSTransition
      in={fontFamilyVisible}
      timeout={300}
      classNames="popup-slide-up"
      appear={true}
      unmountOnExit
    >
      <FontFamilySettingWrapper>
        <div className="ebook-popup-title">
          <div
            className="ebook-popup-title-icon"
            onClick={() => hideFontFamilyVisible()}
          >
            <span className="icon-down2"></span>
          </div>
          <span className="ebook-popup-title-text">{t('selectFont')}</span>
        </div>
        <PopupList></PopupList>
      </FontFamilySettingWrapper>
    </CSSTransition>
  )
}

export default EbookSettingPopup
