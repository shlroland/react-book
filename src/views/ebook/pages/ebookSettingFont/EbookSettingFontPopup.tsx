import React, { memo, FC } from 'react'
import { useObserver } from 'mobx-react'
import { FontFamilySettingWrapper, PopupListWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore, types } from '@/store/ebook'
import { fontFamily } from '@/utils/book'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { saveFontFamily } from '@/utils/localStorage'

const PopupList = () => {
  const ebookStore = useEbookStore()

  const setFontFamily = (font: types.defaultFontFamily) => {
    saveFontFamily(ebookStore.fileName, font)
    // if (currentBook) {
    // if (font === 'Default') {
    // ebookStore.changeDefaultFontFamily('Times New Roman')
    //     currentBook.rendition.themes.font('Times New Roman')
    // } else {
    ebookStore.changeDefaultFontFamily(font)
    //     currentBook.rendition.themes.font(font)
    // }
    // }
  }
  return useObserver(() => (
    <PopupListWrapper>
      {fontFamily.map((item, index) => {
        return (
          <div
            className="ebook-popup-item"
            key={index}
            onClick={() => setFontFamily(item.font as types.defaultFontFamily)}
          >
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
  ))
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
