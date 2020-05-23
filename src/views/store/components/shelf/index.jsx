import React, { useCallback, useState, useEffect, useMemo } from 'react'
import ScrollView from '@/common/scroll'
import ShelfTitle from './ShelfTitle'
import ShelfSearch from './ShelfSearch'
import Shelf from './Shelf'
import ShelfFooter from './ShelfFooter'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { getLocalStorage } from '@/utils/localStorage'
import { initBookShelf } from '@/utils/shelf'
import { getBookList, changeBookList } from './store/actionCreators'
// import { shelf } from '@/api/book'
// import {
//   getLocalStorage,
//   setLocalStorage,
//   clearLocalStorage,
// } from '@/utils/localStorage'
// import { useEffect } from 'react'
import { BookShelfWrapper } from './style'
// import { useBookList } from './hooks'
// import { getBookList, changeBookList } from './store/actionCreators'

// const BOOK_SHELF_KEY = 'bookShelf'

const BookShelf = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('shelf')
  const [scrollBottom, setScrollBottom] = useState(0)
  const [showType, setShowType] = useState(0)
  const storageBookList = useMemo(() => {
    return getLocalStorage('bookShelf')
  }, [])

  useEffect(() => {
    if (storageBookList) {
      console.log('s')
      initBookShelf(storageBookList)
      dispatch(changeBookList(storageBookList))
    } else {
      console.log('r')
      dispatch(getBookList())
    }
  }, [dispatch, storageBookList])
  //   useBookList()
  //   const storeBookList = useSelector((state) =>
  //     state.getIn(['bookShelf', 'bookList']).toJS()
  //   )
  //   console.log(storeBookList)

  //   const saveBookShelfToLocalStorage = useCallback((list) => {
  //     setLocalStorage(BOOK_SHELF_KEY, list)
  //   }, [])
  //   const getBookShelfFromLocalStorage = useCallback(() => {
  //     return getLocalStorage(BOOK_SHELF_KEY)
  //   }, [])
  //   const appendAddToBookList = useCallback(() => {
  //     if (storeBookList) {
  //       //   storeBookList.push({
  //       //     cover: '',
  //       //     title: '',
  //       //     type: 3,
  //       //     id: Number.MAX_SAFE_INTEGER,
  //       //   })
  //       dispatch(
  //         changeBookList(
  //           [...storeBookList].push({
  //             cover: '',
  //             title: '',
  //             type: 3,
  //             id: Number.MAX_SAFE_INTEGER,
  //           })
  //         )
  //       )
  //     }
  //   }, [dispatch, storeBookList])
  //   const initBookShelf = useCallback((list) => {
  //     list.forEach((item) => {
  //       item.selected = false
  //     })
  //     // storeBookList.forEach((item) => {
  //     //   item.selected = false
  //     // })
  //     // dispatch(changeBookList(storeBookList))
  //   }, [])
  //   useEffect(() => {
  //     const list = getBookShelfFromLocalStorage()
  //     if (!list) {
  //       //   shelf().then((response) => {
  //       // const fetchList = response.data.bookList
  //       // console.log(response)
  //       dispatch(getBookList()).then(() => {
  //         appendAddToBookList()
  //         initBookShelf()
  //       })
  //       //   if (!fetchList) {
  //       //     //   setBookList([])
  //       //   } else {
  //       //   setBookList(fetchList)
  //       //   }
  //       // saveBookShelfToLocalStorage(fetchList)
  //       //   })
  //     }
  //     // else {
  //     //   initBookShelf(list)
  //     //   //   setBookList(list)
  //     // }
  //   }, [
  //     appendAddToBookList,
  //     dispatch,
  //     getBookShelfFromLocalStorage,
  //     initBookShelf,
  //   ])
  return (
    <BookShelfWrapper>
      <ShelfTitle
        className="shelf-title"
        title={t('title')}
        // data={bookList}
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
          //   data={bookList}
          isEditMode={false}
          showType={showType}
        ></Shelf>
      </ScrollView>
      <ShelfFooter className={'book-shelf-footer'}></ShelfFooter>
      {/* <toast :text="toastText" ref="toast"></toast> */}
    </BookShelfWrapper>
  )
}

export default BookShelf
