import * as actionTypes from './constants'
import { shelf } from '@/api/book'
import { fromJS } from 'immutable'
import { setLocalStorage } from '@/utils/localStorage'
import { initBookShelf, appendAddToBookList } from '@/utils/shelf'

export const changeIsEditMode = (data) => ({
  type: actionTypes.CHANGE_IS_EDIT_MODE,
  data,
})

export const changeBookList = (data) => ({
  type: actionTypes.CHANGE_BOOK_LIST,
  data: fromJS(data),
})

export const changeSelectedList = (data) => ({
  type: actionTypes.CHANGE_SELECTED_LIST,
  data: fromJS(data),
})

export const getBookList = () => {
  return (dispatch) => {
    return shelf().then((res) => {
      const bookList = res.data.bookList
      appendAddToBookList(bookList)
      initBookShelf(bookList)
      setLocalStorage('bookShelf', bookList)
      dispatch(changeBookList(bookList))
      return bookList
    })
  }
}

export const getSelectedList = (data) => {
  return (dispatch) => {
    dispatch(changeSelectedList(data.filter((item) => item.selected === true)))
  }
}
