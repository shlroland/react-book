import React, { FC, useEffect } from 'react'
import { BookShelfWrapper } from './style'
import { useLocalStore, useObserver } from 'mobx-react'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import { shelf } from '@/api'
import { BookShelfStoreReturn } from './types'
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
      showTitle() {
        this.ifShowTitle = true
      },
      changeBookList(bookList) {
        this.bookList = bookList
      },
      setIsEditMode(flag) {
        this.isEditMode = flag
      },
      onSearchClick() {
        // this.onEditClick(false)
        this.showType = 1
        this.ifShowTitle = false
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
        setEditMode={store.setIsEditMode}
      ></ShelfTitle>
      <ScrollView
        className="book-shelf-scroll-wrapper"
        top={0}
        bottom={store.scrollBottom}
      >
        <ShelfSearch onSearchClick={store.onSearchClick} onSearchTabClick={store.onSearchTabClick}></ShelfSearch>
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
