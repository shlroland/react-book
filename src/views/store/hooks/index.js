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
import { downloadBook, removeBookCache } from '../../../utils/shelf'
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

export const useSetDownload = (
  showToast,
  showContinueToast,
  hideToast,
  t,
  setToastText
) => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const editClick = useEditClick()
  const cb = useCallback(
    async (needDownload) => {
      showContinueToast(t('startDownload'))
      for (let i = 0; i < bookList.length; i++) {
        const item = bookList[i]
        if (needDownload && item.selected) {
          await downloadBook(item, showContinueToast, t).then(() => {
            // hideToast()
            showToast(t('setDownloadSuccess'))
            item.cache = needDownload
          })
        } else if (!needDownload && item.selected) {
          await removeBookCache(item.fileName).then(() => {
            item.cache = needDownload
          })
        }
        if (item.itemList) {
          for (let i = 0; i < item.length; i++) {
            const subItem = item.itemList[i]
            if (needDownload && subItem.selected) {
              await downloadBook(subItem, showContinueToast, t).then(() => {
                subItem.cache = needDownload
              })
            } else if (!needDownload && subItem.selected) {
              await removeBookCache(subItem.fileName).then(() => {
                subItem.cache = needDownload
              })
            }
          }
        }
      }
      // hideToast()
      // if (needDownload) {
      //   showToast(t('setDownloadSuccess'))
      // } else {
      //   showToast(t('removeDownloadSuccess'))
      // }
      dispatch(changeBookList(bookList))
      editClick(false)
      setLocalStorage('bookShelf', bookList)
      console.log('数据保存成功...')
    },
    [bookList, dispatch, editClick, hideToast, showContinueToast, showToast, t]
  )
  return cb
}
