import React, { FC, memo } from 'react'
import { ShelfFooterWrapper } from './style'
import { BookList, BookItem } from '../types'
import { useTranslation } from 'react-i18next'
import { useLocalStore, useObserver } from 'mobx-react'
import { footerTabs } from '@/utils/book'
import classnames from 'classnames'

interface ShelfFooterProp {
  data: BookList
  isInGroup: boolean
  isEditMode: boolean
}

const ShelfFooter: FC<ShelfFooterProp> = (props) => {
  const { t } = useTranslation('shelf')

  const store = useLocalStore(
    (source) => ({
      tabs: footerTabs(t),
      get isSelected() {
        if (source.data) {
          return source.data.some((item) => item.selected)
        } else {
          return false
        }
      },
      get isPrivate() {
        if (!this.isSelected) {
          return false
        } else {
          return source.data.every((item) => {
            if (item.selected) {
              return (item as BookItem).private
            } else {
              return true
            }
          })
        }
      },
      get isDownload() {
        if (!this.isSelected) {
          return false
        } else {
          return source.data.every((item) => {
            if (item.selected) {
              return (item as BookItem).cache
            } else {
              return true
            }
          })
        }
      },
      label(item: { label: string; label2: string; index: number }) {
        switch (item.index) {
          case 1:
            return this.isPrivate ? item.label2 : item.label
          case 2:
            return this.isDownload ? item.label2 : item.label
          default:
            return item.label
        }
      },
    }),
    props
  )

  return useObserver(() => (
    <ShelfFooterWrapper
      className="book-shelf-footer"
      style={{ display: props.isEditMode ? 'flex' : 'none' }}
    >
      {store.tabs.map((item, index) => {
        return (
          <div
            className="book-shelf-tab-wrapper"
            key={index}
            // onClick={() => onTabClick(item)}
          >
            <div className="book-shelf-tab">
              {item.index === 1 && !store.isPrivate ? (
                <div
                  className={classnames({
                    'icon-private': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}
              {item.index === 1 && store.isPrivate ? (
                <div
                  className={classnames({
                    'icon-private-see': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}

              {item.index === 2 && !store.isDownload ? (
                <div
                  className={classnames({
                    'icon-download': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}

              {item.index === 2 && store.isDownload ? (
                <div
                  className={classnames({
                    'icon-download-remove': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}
              {item.index === 3 ? (
                <div
                  className={classnames({
                    'icon-move': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}
              {item.index === 4 ? (
                <div
                  className={classnames({
                    'icon-shelf': true,
                    'tab-icon': true,
                    'is-selected': store.isSelected,
                  })}
                ></div>
              ) : null}
              <div
                className={classnames({
                  'tab-text': true,
                  'remove-text': item.index === 4,
                  'is-selected': store.isSelected,
                })}
              >
                {store.label(
                  item as { label: string; label2: string; index: number }
                )}
              </div>
            </div>
          </div>
        )
      })}
    </ShelfFooterWrapper>
  ))
}

ShelfFooter.defaultProps = {
  isInGroup: false,
}

export default memo(ShelfFooter)
