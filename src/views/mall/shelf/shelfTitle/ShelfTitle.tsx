import React, { FC, memo, useState } from 'react'
import { ShelfTitleWrapper } from './style'
import { BookList, CategoryItem } from '../types'
import { useObserver, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'

interface ShelfTitleProp {
  title: string
  data: BookList
  ifShowBack: boolean
  ifShowClear: boolean
  isEditMode: boolean
  category?: CategoryItem
  ifGroupEmpty?: boolean
  ifShowTitle: boolean
  setEditMode: (flag: boolean) => void
}

const ShelfTitle: FC<ShelfTitleProp> = (props) => {
  const { t } = useTranslation('shelf')

  const { data, category, ifShowTitle } = props

  const store = useLocalStore((source) => {
    return {
      get selectedNumber() {
        if (source.category && source.category.itemList) {
          return source.category.itemList.filter((item) => item.selected).length
        } else if (source.data) {
          return source.data.filter((item) => item.selected).length
        } else {
          return 0
        }
      },
      get selectedText() {
        return this.selectedNumber === 0
          ? t('selectBook')
          : this.selectedNumber === 1
          ? t('haveSelectedBook', { $1: this.selectedNumber })
          : t('haveSelectedBooks', { $1: this.selectedNumber })
      },
    }
  }, props)

  const [isHideShadow, setIsHideShadow] = useState(true)

  return useObserver(() => (
    <CSSTransition
      in={ifShowTitle}
      timeout={500}
      classNames="fade"
      appear={true}
      unmountOnExit
    >
      <ShelfTitleWrapper className={isHideShadow ? 'hide-shadow' : ''}>
        <div className="title">
          <span className="title-text">{props.title}</span>
          <span
            className="sub-title-text"
            style={{ display: props.isEditMode ? 'inline' : 'none' }}
          >
            {store.selectedText}
          </span>
          {!props.ifGroupEmpty ? (
            <div className="btn-text-wrapper">
              <span className="btn-text">
                {props.isEditMode ? t('cancel') : t('edit')}
              </span>
            </div>
          ) : (
            <div className="btn-text-wrapper">
              <span className="btn-text">{t('editGroup')}</span>
            </div>
          )}
          {props.ifShowClear ? (
            <div className="btn-clear-wrapper">
              <span className="btn-clear">{t('clearCache')}</span>
            </div>
          ) : null}
          {props.ifShowBack && !props.isEditMode ? (
            <div className="btn-back-wrapper">
              <span className="icon-back"></span>
            </div>
          ) : null}
          {props.ifShowBack && props.isEditMode ? (
            <div className="btn-back-wrapper">
              <span className="btn-text">{t('editGroup')}</span>
            </div>
          ) : null}
        </div>
      </ShelfTitleWrapper>
    </CSSTransition>
  ))
}

export default memo(ShelfTitle)
