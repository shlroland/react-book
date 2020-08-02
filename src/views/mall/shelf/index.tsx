import React, { FC, useEffect, useState } from 'react'
import { BookShelfWrapper } from './style'
import { useLocalStore, useObserver } from 'mobx-react'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import { shelf } from '@/api'
import { BookShelfStoreReturn } from './types'
import { useTranslation } from 'react-i18next'
import ShelfTitle from './shelfTitle/ShelfTitle'
import ScrollView from '@/common/scroll/Scroll'
import ShelfSearch from './shlefSearch/ShelfSearch'
import ShelfCom from './shelfCom/ShelfCom'

const BOOK_SHELF_KEY = 'bookShelf'

const BookShelf: FC = () => {
  const { t } = useTranslation('shelf')

  const store = useLocalStore<BookShelfStoreReturn>(() => {
    return {
      bookList: [],
      isEditMode: false,
      scrollBottom: 0,
      showType: 0,
      changeBookList(bookList) {
        this.bookList = bookList
      },
      setIsEditMode(flag) {
        this.isEditMode = flag
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

  const [ifShowBack, setIfShowBack] = useState(false)
  const [isShowClear, setIsShowClear] = useState(true)

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
        ifShowBack={ifShowBack}
        ifShowClear={isShowClear}
        isEditMode={store.isEditMode}
        setEditMode={store.setIsEditMode}
      ></ShelfTitle>
      <ScrollView
        className="book-shelf-scroll-wrapper"
        top={0}
        bottom={store.scrollBottom}
      >
        <ShelfSearch></ShelfSearch>
        <ShelfCom
          data={store.bookList}
          showType={store.showType}
          isEditMode={store.isEditMode}
        ></ShelfCom>
      </ScrollView>
    </BookShelfWrapper>
  ))
}

export default BookShelf
