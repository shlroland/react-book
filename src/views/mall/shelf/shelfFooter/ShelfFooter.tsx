import React, { FC, memo, useRef } from 'react'
import { ShelfFooterWrapper } from './style'
import { BookList, BookItem, categoryListItem } from '../types'
import { useTranslation } from 'react-i18next'
import { useLocalStore, useObserver } from 'mobx-react'
import { footerTabs } from '@/utils/book'
import classnames from 'classnames'
import Popup, { RefProp } from '@/common/popup/Popup'
import ShelfGroupDialog, {
  RefProp as DialogRefProp,
} from '../shelfGroupDialog/ShelfGroupDialog'
interface ShelfFooterProp {
  data: BookList
  bookList: BookList
  isInGroup: boolean
  isEditMode: boolean
  setPrivate: (v: boolean) => void
  setDownload: (v: boolean) => Promise<void>
  removeBook: () => void
  groupEdit: (operation: number, group: categoryListItem) => void
}

type TabItem =
  | {
      label: string
      label2: string
      index: number
    }
  | {
      label: string
      index: number
      label2?: undefined
    }

const ShelfFooter: FC<ShelfFooterProp> = (props) => {
  const { t } = useTranslation('shelf')
  const popupRef = useRef<RefProp | null>(null)
  const dialogRef = useRef<DialogRefProp | null>(null)

  const store = useLocalStore(
    (source) => ({
      tabs: footerTabs(t),
      popTitle: '',
      confirmText: '',
      onConfirm: function (...args: any): any {},
      isRemoveText: false,
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
      get selectedBooks() {
        let selectedBooks: BookItem[] = []
        source.data.forEach((item) => {
          if (item.selected) {
            selectedBooks.push(item as BookItem)
          }
        })
        return selectedBooks
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
      showPrivate() {
        if (this.isSelected) {
          if (!this.isPrivate) {
            this.showPopup(t('setPrivateTitle'), t('open'), () =>
              source.setPrivate(true)
            )
          } else {
            this.showPopup(t('closePrivateTitle'), t('close'), () =>
              source.setPrivate(false)
            )
          }
        }
      },
      showPopup(
        title: string,
        confirmText: string,
        onConfirm: (...args: any) => any,
        isRemoveText = false
      ) {
        this.popTitle = title
        this.confirmText = confirmText
        this.onConfirm = onConfirm
        this.isRemoveText = isRemoveText
        popupRef.current!.show()
      },
      showDownload() {
        if (this.isSelected) {
          if (!this.isDownload) {
            this.showPopup(t('setDownloadTitle'), t('open'), () => {
              source.setDownload(true)
            })
          } else {
            this.showPopup(
              t('removeDownloadTitle'),
              t('delete'),
              () => {
                source.setDownload(false)
              },
              true
            )
          }
        }
      },
      showRemove() {
        if (this.isSelected) {
          let msg
          if (this.selectedBooks.length === 1) {
            msg = t('removeBookTitle', {
              $1: `《${this.selectedBooks[0].title}》`,
            })
          } else {
            msg = t('removeBookTitle', { $1: t('selectedBooks') })
          }
          this.showPopup(msg, t('removeBook'), source.removeBook, true)
        }
      },
      showGroupDialog() {
        if (this.isSelected) {
          dialogRef.current?.show()
        }
      },
    }),
    props
  )

  const onTabClick = (item: TabItem) => {
    if (item.index === 1) {
      store.showPrivate()
    } else if (item.index === 2) {
      store.showDownload()
    } else if (item.index === 3) {
      store.showGroupDialog()
    } else if (item.index === 4) {
      store.showRemove()
    }
  }

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
            onClick={() => onTabClick(item)}
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
      <Popup
        ref={popupRef}
        title={store.popTitle}
        confirmText={store.confirmText}
        isRemoveText={store.isRemoveText}
        confirm={store.onConfirm}
        cancelText={t('cancel')}
      ></Popup>
      <ShelfGroupDialog
        ref={dialogRef}
        bookList={props.isInGroup ? props.bookList : props.data}
        isInGroup={props.isInGroup}
        groupEdit={props.groupEdit}
      ></ShelfGroupDialog>
    </ShelfFooterWrapper>
  ))
}

ShelfFooter.defaultProps = {
  isInGroup: false,
  bookList: []
}

export default memo(ShelfFooter)
