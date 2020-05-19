import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ShelfWrapper } from './style'
import classnames from 'classnames'
import ShelfImage from './ShelfImage'
import ShelfCategory from './ShelfCategory'

const Shelf = (props) => {
  const { className: classNameWrapper, data, showType, isEditMode } = props
  const bookData = useMemo(() => {
    console.log(data)
    if (showType === 0) {
      return data
    } else if (showType === 1) {
      return data
    }
  }, [data, showType])
  const { t } = useTranslation('shelf')
  return (
    <ShelfWrapper className={classNameWrapper}>
      <div id="book-shelf-list">
        {bookData.map((item, index) => {
          return (
            <div className="book-shelf-item" key={item.id}>
              <div
                className={classnames({
                  'book-img-wrapper': true,
                  'add-book': item.type === 3,
                  'category-book': item.type === 2,
                })}
              >
                {item.type === 1 ? (
                  <ShelfImage data={item} isEditMode={isEditMode}></ShelfImage>
                ) : item.type === 2 ? (
                    <ShelfCategory
                      data={item}
                      isEditMode={isEditMode}
                    ></ShelfCategory>
                  ) : <span className="icon-add icon"></span>}
              </div>
              <div className="book-title-wrapper">
                <span className="book-title title-small">{item.title}</span>
              </div>
            </div>
          )
        })}
        {/* <div
          className="book-shelf-item"
          v-for="(item, index) in bookData"
          key="item.id"
          click="onBookClick(item, index)"
        >
          <div
            className="book-img-wrapper"
            className="{'add-book': item.type === 3, 'category-book': item.type ===2}"
            ref="bookImg"
          >
            <shelf-image
              data="item"
              isEditMode="isEditMode"
              v-if="item.type === 1"
            ></shelf-image>
            <shelf-category
              data="item"
              isEditMode="isEditMode"
              v-else-if="item.type === 2"
            ></shelf-category>
            <span className="icon-add icon" v-else></span>
          </div>
          <div className="book-title-wrapper">
            <span className="book-title title-small">{item.title}</span>
          </div>
        </div> */}
      </div>
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
      {/* <div className="book-shelf-statistics" v-show="showType === 0">
        {t('statistic', { $1: publicNumber, $2: privateNumber })}
      </div> */}
    </ShelfWrapper>
  )
}

export default Shelf
