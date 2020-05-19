import React, { useCallback, useState } from 'react'
import ScrollView from '@/common/scroll'
import ShelfTitle from './ShelfTitle'
import ShelfSearch from './ShelfSearch'
import Shelf from './Shelf'
import { useTranslation } from 'react-i18next'
import { shelf } from '@/api/book'
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from '@/utils/localStorage'
import { useEffect } from 'react'
import { BookShelfWrapper } from './style'

const BOOK_SHELF_KEY = 'bookShelf'

const BookShelf = () => {
  const { t } = useTranslation('shelf')
  const [bookList, setBookList] = useState([])
  const [scrollBottom, setScrollBottom] = useState(0)
  const [showType, setShowType] = useState(0);
  const saveBookShelfToLocalStorage = useCallback((list) => {
    setLocalStorage(BOOK_SHELF_KEY, list)
  }, [])
  const getBookShelfFromLocalStorage = useCallback(() => {
    return getLocalStorage(BOOK_SHELF_KEY)
  }, [])
  const appendAddToBookList = useCallback((list) => {
    list.push({
      cover: '',
      title: '',
      type: 3,
      // id: this.bookList[this.bookList.length - 1].id + 1
      id: Number.MAX_SAFE_INTEGER,
    })
  }, [])
  const initBookShelf = useCallback((list) => {
    list.forEach((item) => {
      item.selected = false
    })
  }, [])
  useEffect(() => {
    const list = getBookShelfFromLocalStorage()
    if (!list) {
      shelf().then((response) => {
        const fetchList = response.data.bookList
        // console.log(response)

        if (!fetchList) {
          setBookList([])
        } else {
          appendAddToBookList(fetchList)
          initBookShelf(fetchList)
          setBookList(fetchList)
        }
        saveBookShelfToLocalStorage(fetchList)
      })
    } else {
      initBookShelf(list)
      setBookList(list)
    }
  }, [
    appendAddToBookList,
    getBookShelfFromLocalStorage,
    initBookShelf,
    saveBookShelfToLocalStorage,
  ])
  return (
    <BookShelfWrapper>
      <ShelfTitle
        className="shelf-title"
        title={t('title')}
        isEditMode={false}
        data={bookList}
        ifShowBack={false}
        ifShowClear={true}
      ></ShelfTitle>
      <ScrollView
        className={['book-shelf-scroll-wrapper']}
        top={0}
        bottom={scrollBottom}
      >
        <ShelfSearch></ShelfSearch>
        <Shelf
          className="book-shelf-list"
          data={bookList}
          isEditMode={false}
          showType={showType}
        ></Shelf>
        {/* <book-shelf-empty
                  className="book-shelf-empty"
                  v-if="isDataEmpty"></book-shelf-empty> */}
      </ScrollView>
      {/* <book-shelf-footer className="book-shelf-footer"
                       :data="bookList"
                       :bookList="bookList"
                       :isInGroup="false"
                       @setPrivate="setPrivate"
                       @setDownload="setDownload"
                       @removeBook="removeBook"
                       @groupEdit="groupEdit"
                       v-show="isEditMode"></book-shelf-footer>
    <toast :text="toastText" ref="toast"></toast> */}
    </BookShelfWrapper>
  )
}

export default BookShelf
