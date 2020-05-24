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
import { BookShelfWrapper } from './style'

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

  return (
    <BookShelfWrapper>
      <ShelfTitle
        className="shelf-title"
        title={t('title')}
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
          isEditMode={false}
          showType={showType}
        ></Shelf>
      </ScrollView>
      <ShelfFooter className={'book-shelf-footer'}></ShelfFooter>
    </BookShelfWrapper>
  )
}

export default BookShelf
