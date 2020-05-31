/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { BookCategoryWrapper } from './style'
import ScrollView from '@/common/scroll'
import CategoryTitle from './CategoryTitle'
import Category from './Category'
import CategoryFooter from './CategoryFooter'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeBookList } from './store/actionCreators'

const bookCategory = () => {
  const dispatch = useDispatch()
  const {
    state: { category },
  } = useLocation()
  const scrollBottom = useSelector((state) =>
    state.getIn(['bookCategory', 'scrollBottom'])
  )

  useEffect(() => {
    dispatch(changeBookList(category.itemList))
  }, [category, dispatch])

  return (
    <BookCategoryWrapper>
      <CategoryTitle
        className="shelf-title"
        title={category.title}
      ></CategoryTitle>
      <ScrollView top={42} bottom={scrollBottom}>
        <Category className="book-shelf-list"></Category>
      </ScrollView>
      <CategoryFooter className="book-shelf-footer"></CategoryFooter>
    </BookCategoryWrapper>
  )
}

export default bookCategory
