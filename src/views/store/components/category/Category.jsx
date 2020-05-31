import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { CategoryWrapper } from './style'
import { Flipper, Flipped } from 'react-flip-toolkit'
import CategoryImage from './CategoryImage'
import { useSelector, useDispatch } from 'react-redux'
import { useShowBookDetail } from './hooks'
import { useHistory } from 'react-router-dom'
import { changeBookList, setSelectedList } from './store/actionCreators'

const Shelf = (props) => {
  const dispatch = useDispatch()
  const { className: classNameWrapper } = props

  const isEditMode = useSelector((state) =>
    state.getIn(['bookCategory', 'isEditMode'])
  )

  const bookList = useSelector((state) =>
    state.getIn(['bookCategory', 'bookList']).toJS()
  )
  console.log(bookList)

  const { t } = useTranslation('shelf')
  const history = useHistory()

  const showBookDetail = useShowBookDetail()

  const flipNum = useMemo(() => {
    if (bookList.length > 0) {
      return bookList.reduce((acc, cur) => {
        return acc + cur.id
      }, 0)
    } else {
      return 0
    }
  }, [bookList])

  const publicNumber = useMemo(() => {
    if (bookList) {
      let number = 0
      bookList.filter((item) => {
        if (!item.private && item.type === 1) {
          number++
        } else if (item.type === 2 && item.itemList.length > 0) {
          number += item.itemList.filter((subItem) => {
            return !subItem.private && subItem.type === 1
          }).length
        }
      })
      return number
    } else {
      return 0
    }
  }, [bookList])

  const privateNumber = useMemo(() => {
    if (bookList) {
      let number = 0
      // eslint-disable-next-line array-callback-return
      bookList.filter((item) => {
        if (item.private && item.type === 1) {
          number++
        } else if (item.type === 2 && item.itemList.length > 0) {
          number += item.itemList.filter((subItem) => {
            return subItem.private && subItem.type === 1
          }).length
        }
      })
      return number
    } else {
      return 0
    }
  }, [bookList])

  const onBookClick = useCallback(
    (book, index) => {
      if (book.type === 3) {
        history.push('/book-store/home')
      } else if (book.type === 1) {
        if (isEditMode) {
          bookList[index].selected = !bookList[index].selected
          dispatch(changeBookList(bookList))
          dispatch(setSelectedList(bookList))
        } else {
          showBookDetail(book)
        }
      } else if (book.type === 2) {
        if (!isEditMode) {
        }
      }
    },
    [bookList, dispatch, history, isEditMode, showBookDetail]
  )

  return (
    <CategoryWrapper className={classNameWrapper}>
      <Flipper className="book-shelf-content-list" flipKey={flipNum}>
        {bookList &&
          bookList.map((item, index) => {
            return (
              <Flipped classNames="item" key={item.id} flipId={item.id}>
                <div
                  className="book-shelf-item"
                  onClick={() => onBookClick(item, index)}
                >
                  <div className="book-img-wrapper">
                    <CategoryImage
                      data={item}
                      isEditMode={isEditMode}
                    ></CategoryImage>
                  </div>
                  <div className="book-title-wrapper">
                    <span className="book-title title-small">{item.title}</span>
                  </div>
                </div>
              </Flipped>
            )
          })}
      </Flipper>
      <div className="book-shelf-statistics">
        {t('statistic', { $1: publicNumber, $2: privateNumber })}
      </div>
    </CategoryWrapper>
  )
}

export default Shelf
