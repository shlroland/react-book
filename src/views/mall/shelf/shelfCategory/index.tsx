import React, { FC, useEffect } from 'react'
import { useObserver, useLocalStore } from 'mobx-react'
import { BookCategoryWrapper } from './style'
import ShelfTitle from '../shelfTitle/ShelfTitle'
import { useTranslation } from 'react-i18next'
import {
  BookShelfCategoryReturn,
  BookItem,
  CategoryItem,
  BookList,
} from '../types'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import ScrollView from '@/common/scroll/Scroll'
import ShelfCom from '../shelfCom/ShelfCom'
import ShelfFooter from '../shelfFooter/ShelfFooter'
import useToast from '@/common/toast/Toast'
import { getLocalForage } from '@/utils/localForage'
import Epub from 'epubjs'
import { download } from '@/api'
import { removeBookCache } from '@/utils/book'
import { toJS } from 'mobx'

const BOOK_SHELF_KEY = 'bookShelf'

const ShelfCategory: FC = () => {
  const { t } = useTranslation('shelf')
  const location = useLocation()

  const { RenderToast, showToast } = useToast()

  const getBookShelfFromLocalStorage: () => BookList = () => {
    return getLocalStorage(BOOK_SHELF_KEY)
  }

  const store = useLocalStore<BookShelfCategoryReturn>(() => {
    return {
      bookList: [],
      category: null,
      isEditMode: false,
      ifShowBack: true,
      ifShowClear: false,
      scrollBottom: 0,
      get isEmpty() {
        if (
          this.category &&
          this.category.itemList &&
          this.category.itemList.length > 0
        ) {
          return false
        } else {
          return true
        }
      },
      get getSelectedBooks() {
        const selectedBooks = this.category?.itemList.filter((item) => {
          return (item as BookItem).selected
        }) as BookItem[]
        this.category?.itemList.forEach((item) => {
          if (item.type === 2 && item.itemList) {
            item.itemList.forEach((subItem: any) => {
              if (subItem.selected) {
                selectedBooks.push(subItem)
              }
            })
          }
        })
        return selectedBooks
      },
      saveBookShelfToLocalStorage() {
        console.log(toJS(this.bookList))
        setLocalStorage(BOOK_SHELF_KEY, this.bookList)
      },
      changeBookList(bookList) {
        this.bookList = bookList
      },
      changeCategory(index) {
        if (this.bookList) {
          this.category = this.bookList[index] as CategoryItem
        }
      },
      onEditClick(v) {
        this.isEditMode = v
        if (!this.isEditMode) {
          this.bookList.forEach((item) => {
            if ((item as BookItem).bookId) {
              item.selected = false
            } else if (item.itemList) {
              ;(item as CategoryItem).itemList.forEach((subItem) => {
                subItem.selected = false
              })
            }
          })
        }
        if (this.isEditMode) {
          this.scrollBottom = 42
        } else {
          this.scrollBottom = 0
        }
      },
      setPrivate(v) {
        this.category?.itemList.forEach((item) => {
          if (item.selected) {
            ;(item as BookItem).private = v
          }
        })
        this.onEditClick(false)
        if (v) {
          showToast(t('setPrivateSuccess'))
        } else {
          showToast(t('closePrivateSuccess'))
        }
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
      },
      async setDownload(needDownload) {
        showToast(t('startDownload'))
        for (let i = 0; i < this.category?.itemList.length!; i++) {
          const item = this.category?.itemList[i]!
          if (needDownload && item.selected) {
            await this.downloadBook(item as BookItem)
            ;(item as BookItem).cache = needDownload
            showToast(t('endDownload'))
          } else if (!needDownload && item.selected) {
            await this.removeDownloadBook(item as BookItem)
            ;(item as BookItem).cache = needDownload
            showToast(t('endDownload'))
          }
          if (item.itemList) {
            for (let i = 0; i < item.itemList.length; i++) {
              await this.downloadItem(item.itemList[i], needDownload)
            }
          }
        }
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
      },
      downloadBook(item) {
        return new Promise((resolve, reject) => {
          getLocalForage(item.fileName, (err, value) => {
            if (!err && value instanceof Blob) {
              console.log(
                `[${item.fileName}]读取成功...`,
                value,
                Epub(value as any)
              )
              resolve()
            } else {
              download(
                item,
                (item) => {
                  console.log('[' + item.fileName + ']下载成功...')
                  resolve()
                },
                reject,
                reject
              )
            }
          })
        })
      },
      async downloadItem(subItem, needDownload) {
        if (needDownload && subItem.selected) {
          this.downloadBook(subItem)
          subItem.cache = needDownload
        } else if (!needDownload && subItem.selected) {
          this.removeDownloadBook(subItem)
          subItem.cache = needDownload
        }
      },
      removeDownloadBook(item) {
        return removeBookCache(item.fileName)
      },
      removeBook() {
        this.bookList = this.bookList.filter((item) => {
          if (item.itemList) {
            item.itemList = item.itemList.filter((subItem: BookItem) => {
              return !subItem.selected
            })
          }
          return !item.selected
        })
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
      },
      moveToGroup(group) {
        const selectedBooks = this.getSelectedBooks
        this.clearSelectedBooks()
        if (group && group.itemList) {
          group.itemList = [...group.itemList, ...selectedBooks]
          group.itemList.forEach((item, index) => {
            item.id = index + 1
          })
          this.onEditClick(false)
          this.saveBookShelfToLocalStorage()
          showToast(t('moveBookInSuccess', { $1: group.title }))
        }
      },
      clearSelectedBooks() {
        // this.category.itemList = this.category?.itemList.filter((item) => {
        //   return !item.selected
        // })
        if (this.category?.itemList) {
          this.category.itemList = this.category?.itemList.filter((item) => {
            return !item.selected
          })
        }
        // this.bookList.forEach((item) => {
        //   if (item.type === 2 && item.itemList) {
        //     item.itemList = item.itemList.filter((subItem: BookItem) => {
        //       return !subItem.selected
        //     })
        //   }
        // })
      },
      newGroup(group) {
        this.clearAddFromBookList()
        this.bookList.push(group)
        this.appendAddToBookList()
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
      },
      groupEdit(operation, group) {
        switch (operation) {
          case 1:
            this.moveToGroup(group as CategoryItem)
            break
          case 2:
            this.moveToGroup(group as CategoryItem)
            this.newGroup(group as CategoryItem)
            break
          case 3:
            this.moveOutGroup()
            break
        }
      },
      moveOutGroup() {
        this.clearAddFromBookList()
        this.appendBookToList()
        this.clearSelectedBooks()
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
        showToast(t('moveBookOutSuccess'))
      },
      appendBookToList() {
        let id = this.bookList[this.bookList.length - 1].id + 1
        this.getSelectedBooks.forEach((item) => {
          item.id = id++
          this.bookList.push(item)
        })
        this.appendAddToBookList()
      },
      clearAddFromBookList() {
        this.bookList = this.bookList.filter((item) => {
          return item.type !== 3
        })
      },
      appendAddToBookList() {
        console.log(toJS(this.bookList))
        this.bookList.push({
          cover: '',
          title: '',
          type: 3,
          id: Number.MAX_SAFE_INTEGER,
        })
        console.log(toJS(this.bookList))
      },
    }
  })

  useEffect(() => {
    store.changeBookList(getBookShelfFromLocalStorage())
    store.changeCategory(+qs.parse(location.search.slice(1)).index!)
  }, [location.search, store])

  return useObserver(() => (
    <BookCategoryWrapper>
      <ShelfTitle
        title={store.category?.title}
        data={store.bookList}
        category={store.category!}
        ifShowBack={store.ifShowBack}
        ifShowClear={store.ifShowClear}
        isEditMode={store.isEditMode}
        ifGroupEmpty={store.isEmpty}
        ifShowTitle={true}
        onEditClick={store.onEditClick}
      ></ShelfTitle>
      {!store.isEmpty ? (
        <>
          <ScrollView
            className="book-shelf-scroll-wrapper"
            style={{
              top: '42px',
            }}
            top={42}
            bottom={store.scrollBottom}
          >
            <ShelfCom
              data={store.category?.itemList ? store.category.itemList : []}
              showType={0}
              isEditMode={store.isEditMode}
            ></ShelfCom>
          </ScrollView>
          <ShelfFooter
            data={store.category?.itemList ? store.category.itemList : []}
            bookList={store.bookList}
            isEditMode={store.isEditMode}
            isInGroup={true}
            setPrivate={store.setPrivate}
            setDownload={store.setDownload}
            removeBook={store.removeBook}
            groupEdit={store.groupEdit}
          ></ShelfFooter>
        </>
      ) : null}
      <RenderToast></RenderToast>
      {store.isEmpty ? (
        <div className="shelf-empty-view">
          <span className="shelf-empty-text">{t('groupNone')}</span>
        </div>
      ) : null}
    </BookCategoryWrapper>
  ))
}

export default ShelfCategory
