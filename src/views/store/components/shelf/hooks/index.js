import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  changeBookList,
  changeScrollBottom,
  changeIsEditMode,
  changeSelectedList,
} from '../store/actionCreators'
import { setLocalStorage } from '@/utils/localStorage'
import { useCallback } from 'react'
import { downloadBook, removeBookCache } from '@/utils/shelf'
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
  const cb = useCallback(
    (bool,bookList) => {
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
      dispatch(changeScrollBottom(scroll))
    },
    [dispatch]
  )
  return cb
}

export const useSetPrivate = () => {
  const dispatch = useDispatch()
  const editClick = useEditClick()
  const cb = useCallback(
    (v,bookList) => {
      bookList.forEach((item) => {
        if (item.selected) {
          item.private = v
        }
      })
      editClick(false,bookList)
      dispatch(changeBookList(bookList))
      setLocalStorage('bookShelf', bookList)
    },
    [dispatch, editClick]
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
      return !item.selected
    })
    dispatch(changeBookList(list))
    setLocalStorage('bookShelf', list)
  }, [bookList, dispatch])
  return cb
}

export const useSetDownload = (
  t
) => {
  const dispatch = useDispatch()
  // const bookList = useSelector((state) =>
  //   state.getIn(['bookShelf', 'bookList']).toJS()
  // )
  const editClick = useEditClick()
  const cb = useCallback(
    async (needDownload,bookList) => {
      for (let i = 0; i < bookList.length; i++) {
        const item = bookList[i]
        if (needDownload && item.selected) {
          await downloadBook(item, t).then(() => {
            // hideToast()
            // showToast(t('setDownloadSuccess'))
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
              await downloadBook(subItem, t).then(() => {
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
      editClick(false,bookList)
      dispatch(changeBookList(bookList))
      setLocalStorage('bookShelf', bookList)
      console.log('数据保存成功...')
    },
    [dispatch, editClick, t]
  )
  return cb
}

export const useMoveToGroup = () => {
  const dispatch = useDispatch()
  const selectedList = useSelector((state) =>
    state.getIn(['bookShelf', 'selectedList']).toJS()
  )
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const editClick = useEditClick()
  const cb = useCallback(
    (group, showToast, t) => {
      console.log(bookList,selectedList)
      if (group && group.itemList) {
        group.itemList = [...group.itemList, ...selectedList]
        group.itemList.forEach((item, index) => {
          item.id = index + 1
        })
      }
      const index = bookList.findIndex((item) => item.id === group.id)
      bookList.splice(index, 1, group)
      const list = bookList.filter((item) => {
        return !item.selected
      })
      showToast(t('moveBookInSuccess', { $1: group.title }))
      editClick(false,list)
      dispatch(changeBookList(list))
      setLocalStorage('bookShelf', list)
    },
    [bookList, dispatch, editClick, selectedList]
  )
  return cb
}

export const useNewGroup = () => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  const editClick = useEditClick()
  const cb = useCallback(
    (group,showToast,t) => {
      let list = bookList.filter((item) => {
        return item.type !== 3
      })
      list.push(group)
      list = list.filter((item) => {
        return !item.selected
      })
      list.push({
        cover: '',
        title: '',
        type: 3,
        id: Number.MAX_SAFE_INTEGER,
      })
      showToast(t('moveBookInSuccess', { $1: group.title }))
      editClick(false,list)
      dispatch(changeBookList(list))
      setLocalStorage('bookShelf', list)
    },
    [bookList, dispatch, editClick]
  )
  return cb
}
