import React, { memo, FC } from 'react'
import { useObserver } from 'mobx-react'
import { FontFamilySettingWrapper, PopupListWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { fontFamily } from '@/utils/book'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'

const PopupList = () => {
  const ebookStore = useEbookStore()

  // const setFontFamily = useCallback(
  //   (font) => {
  //     dispatch(changeDefaultFontFamily(font))
  //     saveFontFamily(fileName, font)
  //     if (currentBook) {
  //       if (font === 'Default') {
  //         currentBook.rendition.themes.font('Times New Roman')
  //       } else {
  //         currentBook.rendition.themes.font(font)
  //       }
  //     }
  //   },
  //   [currentBook, dispatch, fileName]
  // )
  return (
    <PopupListWrapper>
      {fontFamily.map((item, index) => {
        return (
          <div className="ebook-popup-item" key={index}>
            <div
              className={classnames({
                'ebook-popup-item-text': true,
                selected: ebookStore.defaultFontFamily === item.font,
              })}
            >
              {item.font}
            </div>
            <div
              className="ebook-popup-item-check"
              style={{
                display:
                  ebookStore.defaultFontFamily === item.font ? 'block' : 'none',
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

const EbookSettingFontPopup: FC = () => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')

  return useObserver(() => (
    <CSSTransition
      in={ebookStore.fontFamilyVisible}
      timeout={500}
      classNames="popup-slide-up"
      appear={true}
      unmountOnExit
    >
      <FontFamilySettingWrapper>
        <div className="ebook-popup-title">
          <div
            className="ebook-popup-title-icon"
            onClick={() => {
              ebookStore.changeFontFamilyVisible(false)
            }}
          >
            <span className="icon-down2"></span>
          </div>
          <span className="ebook-popup-title-text">{t('selectFont')}</span>
        </div>
        <PopupList></PopupList>
      </FontFamilySettingWrapper>
    </CSSTransition>
  ))
}

export default memo(EbookSettingFontPopup)
