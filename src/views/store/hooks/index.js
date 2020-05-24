import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  changeBookList,
  changeScrollBottom,
  changeIsEditMode,
  changeSelectedList,
} from '../components/shelf/store/actionCreators'
import { setLocalStorage } from '../../../utils/localStorage'
import { useCallback } from 'react'
export const useShowBookDetail = () => {
  const history = useHistory()
  return (book) => {
    history.push(`/book-store/detail/${book.fileName}`, {
      category: book.categoryText,
    })
  }
}

export const useEditClick = () => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  // console.log(bookList)
  const cb = useCallback(
    (bool) => {
      if (!bool) {
        bookList.forEach((item) => {
          if (item.bookId) {
            item.selected = false
          } else if (item.itemList) {
            item.itemList.forEach((subItem) => {
              subItem.selected = false
            })
          }
        })
      }
      let scroll
      if (bool) {
        scroll = 42
      } else {
        scroll = 0
      }
      dispatch(changeSelectedList([]))
      dispatch(changeIsEditMode(bool))
      dispatch(changeBookList(bookList))
      dispatch(changeScrollBottom(scroll))
    },
    [bookList, dispatch]
  )
  return cb
}

export const useSetPrivate = (showToast, t) => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const editClick = useEditClick()
  const cb = useCallback(
    (v) => {
      bookList.forEach((item) => {
        if (item.selected) {
          item.private = v
        }
      })
      if (v) {
        showToast(t('setPrivateSuccess'))
      } else {
        showToast(t('closePrivateSuccess'))
      }

      dispatch(changeBookList(bookList))
      editClick(false)
      setLocalStorage('bookShelf', bookList)
    },
    [bookList, dispatch, editClick, showToast, t]
  )

  return cb
}

export const useRemoveBook = () => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const cb = useCallback(() => {
    const list = bookList.filter((item) => {
      if (item.itemList) {
        item.itemList = item.itemList.filter((subItem) => {
          return !subItem.selected
        })
      }
      return !item.selected
    })
    dispatch(changeBookList(list))
      setLocalStorage('bookShelf', list)
  }, [bookList, dispatch])
  return cb
}
