import React, { FC, useEffect } from 'react'
import { BookShelfWrapper } from './style'
import { useLocalStore, useObserver } from 'mobx-react'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import { shelf } from '@/api'
import { BookShelfStoreReturn, BookItem, CategoryItem } from './types'
import { useTranslation } from 'react-i18next'
import ShelfTitle from './shelfTitle/ShelfTitle'
import ScrollView from '@/common/scroll/Scroll'
import ShelfSearch from './shelfSearch/ShelfSearch'
import ShelfCom from './shelfCom/ShelfCom'
import ShelfFooter from './shelfFooter/ShelfFooter'

const BOOK_SHELF_KEY = 'bookShelf'

const BookShelf: FC = () => {
  const { t } = useTranslation('shelf')

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
    }
  })

  useEffect(() => {
    const bookList = store.getBookShelfFromLocalStorage()
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
      ></ShelfFooter>
    </BookShelfWrapper>
  ))
}

export default BookShelf
