import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeBookList } from '../components/shelf/store/actionCreators'
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

export const useSetPrivate = (showToast, t) => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const cb = useCallback((v) => {

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
      console.log(bookList)
      dispatch(changeBookList(bookList))
      setLocalStorage('bookShelf', bookList)
  },[bookList, dispatch, showToast, t])

  return cb
}
