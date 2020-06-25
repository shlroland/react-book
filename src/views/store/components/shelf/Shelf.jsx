import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ShelfWrapper } from './style'
import { Flipper, Flipped } from 'react-flip-toolkit'
import classnames from 'classnames'
import ShelfImage from './ShelfImage'
import ShelfCategory from './ShelfCategory'
import { useSelector, useDispatch } from 'react-redux'
import { useShowBookDetail } from './hooks'
import { useHistory } from 'react-router-dom'
import { changeBookList, setSelectedList } from './store/actionCreators'

const Shelf = (props) => {
  const dispatch = useDispatch()
  const { className: classNameWrapper, showType } = props

  const isEditMode = useSelector((state) =>
    state.getIn(['bookShelf', 'isEditMode'])
  )

  const data = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )

  const { t } = useTranslation('shelf')
  const history = useHistory()

  const showBookDetail = useShowBookDetail()

  const bookData = useMemo(() => {
    if (showType === 0) {
      return data
    } else if (showType === 1) {
      return data
    }
  }, [data, showType])

  const flipNum = useMemo(() => {
    if (bookData.length > 0) {
      return bookData.reduce((acc, cur) => {
        return acc + cur.id
      }, 0)
    } else {
      return 0
    }
  }, [bookData])

  const publicNumber = useMemo(() => {
    if (data) {
      let number = 0
      data.filter((item) => {
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
  }, [data])

  const privateNumber = useMemo(() => {
    if (data) {
      let number = 0
      // eslint-disable-next-line array-callback-return
      data.filter((item) => {
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
  }, [data])

  const onBookClick = useCallback(
    (book, index) => {
      if (book.type === 3) {
        history.push('/book-store/home')
      } else if (book.type === 1) {
        if (isEditMode) {
          data[index].selected = !data[index].selected
          dispatch(changeBookList(data))
          dispatch(setSelectedList(data))
        } else {
          showBookDetail(book)
        }
      } else if (book.type === 2) {
        if (!isEditMode) {
          history.push(`/book-store/category/${book.title}`, {
            category: book,
          })
        }
      }
    },
    [data, dispatch, history, isEditMode, showBookDetail]
  )

  return (
    <ShelfWrapper className={classNameWrapper}>
      {showType === 0 || showType === 1 ? (
        <Flipper className="book-shelf-content-list" flipKey={flipNum}>
          {bookData &&
            bookData.map((item, index) => {
              return (
                <Flipped classNames="item" key={item.id} flipId={item.id}>
                  <div
                    className="book-shelf-item"
                    onClick={() => onBookClick(item, index)}
                  >
                    <div
                      className={classnames({
                        'book-img-wrapper': true,
                        'add-book': item.type === 3,
                        'category-book': item.type === 2,
                      })}
                    >
                      {item.type === 1 ? (
                        <ShelfImage
                          data={item}
                          isEditMode={isEditMode}
                        ></ShelfImage>
                      ) : item.type === 2 ? (
                        <ShelfCategory
                          data={item}
                          isEditMode={isEditMode}
                        ></ShelfCategory>
                      ) : (
                        <span className="icon-add icon"></span>
                      )}
                    </div>
                    <div className="book-title-wrapper">
                      <span className="book-title title-small">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </Flipped>
              )
            })}
        </Flipper>
      ) : null}
      <div
        className="book-shelf-label-list-wrapper"
        v-if="showType === 2 || showType === 3"
      >
        <div
          className="book-shelf-list-wrapper"
          v-for="(item, index) in purchaseData"
          key="index"
        >
          <div
            className="book-shelf-label-item"
            className="{'is-fixed': item.isFixed}"
          >
            {/* <span className="book-shelf-label-text">{item.label}</span> */}
          </div>
          <div className="book-shelf-item-wrapper">
            <div
              className="book-shelf-item"
              v-for="(subItem, subIndex) in item.bookList"
              key="subItem.id"
              click="onBookClick(subItem, subIndex)"
            >
              <div
                className="book-img-wrapper"
                className="{'add-book': subItem.type === 3, 'category-book': subItem.type ===2}"
              >
                <shelf-image
                  data="subItem"
                  isEditMode="isEditMode"
                  v-if="subItem.type === 1"
                ></shelf-image>
                <shelf-category
                  data="subItem"
                  isEditMode="isEditMode"
                  v-else-if="subItem.type === 2"
                ></shelf-category>
                <span className="icon-add icon"></span>
              </div>
              <div className="book-title-wrapper">
                {/* <span className="book-title title-small">{subItem.title}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="book-shelf-statistics"
        style={{ display: showType === 0 ? 'block' : 'none' }}
      >
        {t('statistic', { $1: publicNumber, $2: privateNumber })}
      </div>
    </ShelfWrapper>
  )
}

export default Shelf
