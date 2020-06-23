/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { BookCategoryWrapper } from './style'
import ScrollView from '@/common/scroll'
import CategoryTitle from './CategoryTitle'
import Category from './Category'
import CategoryFooter from './CategoryFooter'
import { useTranslation } from 'react-i18next'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeBookList } from './store/actionCreators'
import { changeBookList as changeShelfBookList } from '../shelf/store/actionCreators'
import CategoryGroupDialog from './ShelfGroupDialog'
import { setLocalStorage } from '@/utils/localStorage'
import Modal from './Modal'

const bookCategory = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const {
    state: { category },
  } = useLocation()
  const history = useHistory()
  const { t } = useTranslation('shelf')

  const dialogRef = useRef(null)
  const modalRef = useRef(null)
  const modifyRef = useRef(null)

  const scrollBottom = useSelector((state) =>
    state.getIn(['bookCategory', 'scrollBottom'])
  )

  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )
  useEffect(() => {
    setTitle(category.title)
    dispatch(changeBookList(category.itemList))
  }, [category, dispatch])

  const modifyGroupName = useCallback(
    (newGroupName) => {
      const index = bookList.findIndex((item) => {
        return item.id === category.id
      })
      bookList[index].title = newGroupName
      setTitle(newGroupName)
      dispatch(changeShelfBookList(bookList))
      setLocalStorage('bookShelf', bookList)
      modifyRef.current = null
    },
    [bookList, category.id, dispatch]
  )

  const appendBookToList = useCallback((bookList, selectedBooks) => {
    let id = bookList[bookList.length - 1].id + 1
    selectedBooks.forEach((item) => {
      item.id = id++
      bookList.push(item)
    })
  }, [])

  const deleteGroup = useCallback(() => {
    const itemList = category.itemList
    let tempBookList = bookList.filter((item) => {
      return category.id !== item.id
    })
    tempBookList = tempBookList.filter((item) => {
      return item.type !== 3
    })
    appendBookToList(tempBookList, itemList)
    tempBookList.push({
      cover: '',
      title: '',
      type: 3,
      id: tempBookList[tempBookList.length - 1].id + 1,
    })
    dispatch(changeShelfBookList(tempBookList))
    setLocalStorage('bookShelf', tempBookList)
    setTimeout(() => {
      history.goBack()
    }, 20)
  }, [appendBookToList, bookList, category.id, category.itemList, dispatch, history])

  const handleModifyGroupName = useCallback(() => {
    modifyRef.current = modifyGroupName
    dialogRef.current.showCreateGroupDialog(title)
  }, [modifyGroupName, title])

  const handleDeleteGroup = useCallback(() => {
    modalRef.current.show()
  }, [])

  return (
    <>
      <BookCategoryWrapper>
        <CategoryTitle
          className="shelf-title"
          title={title}
          modifyGroupName={handleModifyGroupName}
          deleteGroup={handleDeleteGroup}
        ></CategoryTitle>
        <ScrollView top={42} bottom={scrollBottom}>
          <Category className="book-shelf-list"></Category>
        </ScrollView>
        <CategoryFooter className="book-shelf-footer"></CategoryFooter>
      </BookCategoryWrapper>
      <CategoryGroupDialog
        ref={dialogRef}
        category={category}
        modifyGroupName={modifyGroupName}
      ></CategoryGroupDialog>
      <Modal
        ref={modalRef}
        content={t('deleteGroupTitle')}
        confirm={() => deleteGroup()}
      ></Modal>
    </>
  )
}

export default bookCategory
