import React, { FC, useEffect } from 'react'
import { BookShelfWrapper } from './style'
import { useLocalStore, useObserver } from 'mobx-react'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import { shelf, download } from '@/api'
import { BookShelfStoreReturn, BookItem, CategoryItem } from './types'
import { useTranslation } from 'react-i18next'
import ShelfTitle from './shelfTitle/ShelfTitle'
import ScrollView from '@/common/scroll/Scroll'
import ShelfSearch from './shelfSearch/ShelfSearch'
import ShelfCom from './shelfCom/ShelfCom'
import ShelfFooter from './shelfFooter/ShelfFooter'
import useToast from '@/common/toast/Toast'
import { getLocalForage } from '@/utils/localForage'
import Epub from 'epubjs'
import { removeBookCache } from '@/utils/book'

const BOOK_SHELF_KEY = 'bookShelf'

const BookShelf: FC = () => {
  const { t } = useTranslation('shelf')
  const { RenderToast, showToast } = useToast()
  const store = useLocalStore<BookShelfStoreReturn>(() => {
    return {
      bookList: [],
      isEditMode: false,
      scrollBottom: 0,
      showType: 0,
      ifShowBack: false,
      isShowClear: true,
      ifShowTitle: true,
      changeBookList(bookList) {
        this.bookList = bookList
      },
      setIsEditMode(flag) {
        this.isEditMode = flag
      },
      onSearchClick() {
        this.onEditClick(false)
        this.showType = 1
        this.ifShowTitle = false
      },
      onSearchCancel() {
        this.showType = 0
        this.ifShowTitle = true
      },
      onSearchTabClick(id) {
        this.showType = id
      },
      saveBookShelfToLocalStorage() {
        setLocalStorage(BOOK_SHELF_KEY, this.bookList)
      },
      getBookShelfFromLocalStorage() {
        return getLocalStorage(BOOK_SHELF_KEY)
      },
      appendAddToBookList() {
        this.bookList.push({
          cover: '',
          title: '',
          type: 3,
          id: Number.MAX_SAFE_INTEGER,
        })
      },
      initBookShelf() {
        if (this.bookList.length) {
          this.bookList.forEach((item) => {
            item.selected = false
          })
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
        this.bookList.forEach((item) => {
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
        for (let i = 0; i < this.bookList.length; i++) {
          const item = this.bookList[i]
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
      get getSelectedBooks() {
        const selectedBooks = this.bookList.filter((item) => {
          return (item as BookItem).selected
        }) as BookItem[]
        this.bookList.forEach((item) => {
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
      clearSelectedBooks() {
        this.bookList = this.bookList.filter((item) => {
          return !item.selected
        })
        this.bookList.forEach((item) => {
          if (item.type === 2 && item.itemList) {
            item.itemList = item.itemList.filter((subItem: BookItem) => {
              return !subItem.selected
            })
          }
        })
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
      groupEdit(operation, group) {
        switch (operation) {
          case 1:
            this.moveToGroup(group as CategoryItem)
            break
          case 2:
            // this.newGroup(group)
            // this.moveToGroup(group)
            break
          case 3:
            // this.moveOutGroup()
            break
        }
      },
    }
  })

  useEffect(() => {
    const bookList = store.getBookShelfFromLocalStorage()
    console.log(bookList)
    if (bookList) {
      store.changeBookList(bookList)
    } else {
      shelf().then((response) => {
        let bookList = response.data.bookList
        if (!bookList.length) {
          bookList = []
        }

        store.changeBookList(bookList)
        store.appendAddToBookList()
        store.saveBookShelfToLocalStorage()
        store.initBookShelf()
      })
    }
  }, [store])

  return useObserver(() => (
    <BookShelfWrapper>
      <ShelfTitle
        title={t('title')}
        data={store.bookList}
        ifShowBack={store.ifShowBack}
        ifShowClear={store.isShowClear}
        isEditMode={store.isEditMode}
        ifShowTitle={store.ifShowTitle}
        onEditClick={store.onEditClick}
      ></ShelfTitle>
      <ScrollView
        className="book-shelf-scroll-wrapper"
        top={0}
        bottom={store.scrollBottom}
      >
        <ShelfSearch
          onSearchClick={store.onSearchClick}
          onSearchTabClick={store.onSearchTabClick}
          onSearchCancel={store.onSearchCancel}
        ></ShelfSearch>
        <ShelfCom
          data={store.bookList}
          showType={store.showType}
          isEditMode={store.isEditMode}
        ></ShelfCom>
      </ScrollView>
      <ShelfFooter
        data={store.bookList}
        isEditMode={store.isEditMode}
        isInGroup={false}
        setPrivate={store.setPrivate}
        setDownload={store.setDownload}
        removeBook={store.removeBook}
        groupEdit={store.groupEdit}
      ></ShelfFooter>
      <RenderToast></RenderToast>
    </BookShelfWrapper>
  ))
}

export default BookShelf
