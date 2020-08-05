import React, { memo, FC } from 'react'
import { ShelfWrapper } from './style'
import { useObserver, useLocalStore } from 'mobx-react'
import { BookList, BookItem, CategoryItem } from '../types'
import { flatBookList } from '@/utils/book'
import { Flipper, Flipped } from 'react-flip-toolkit'
import classnames from 'classnames'
import ShelfImage from './ShelfImage'
import ShelfCategory from './ShelfCategory'
import { cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
interface ShelfComProp {
  data: BookList
  showType: number
  isEditMode: boolean
}

const ShelfCom: FC<ShelfComProp> = (props) => {
  const { t } = useTranslation('shelf')

  const store = useLocalStore((source) => {
    return {
      get bookData() {
        if (source.showType === 0) {
          return source.data
        } else if (source.showType === 1) {
          return flatBookList(cloneDeep(source.data))
        } else {
          return undefined
        }
      },
      get flipNum() {
        if (this.bookData) {
          return this.bookData.reduce((acc, cur) => {
            return acc + cur.id
          }, 0)
        } else {
          return 0
        }
      },
      get publicNumber() {
        if (this.bookData) {
          let number = 0
          this.bookData.filter((item) => {
            if (!(item as BookItem).private && item.type === 1) {
              number++
            } else if (item.type === 2 && item.itemList.length > 0) {
              number += (item as CategoryItem).itemList.filter((subItem) => {
                return !subItem.private && subItem.type === 1
              }).length
            }
          })
          return number
        } else {
          return 0
        }
      },
      get privateNumber() {
        if (this.bookData) {
          let number = 0
          this.bookData.filter((item) => {
            if ((item as BookItem).private && item.type === 1) {
              number++
            } else if (item.type === 2 && item.itemList.length > 0) {
              number += (item as CategoryItem).itemList.filter((subItem) => {
                return subItem.private && subItem.type === 1
              }).length
            }
          })
          return number
        } else {
          return 0
        }
      },
    }
  }, props)

  return useObserver(() => (
    <ShelfWrapper className="book-shelf-list">
      {props.showType === 0 || props.showType === 1 ? (
        <Flipper className="book-shelf-content-list" flipKey={store.flipNum}>
          {store.bookData &&
            store.bookData.map((item, index) => (
              <Flipped key={item.id} flipId={item.id}>
                <div className="book-shelf-item">
                  <div
                    className={classnames({
                      'book-img-wrapper': true,
                      'add-book': item.type === 3,
                      'category-book': item.type === 2,
                    })}
                  >
                    {item.type === 1 ? (
                      <ShelfImage
                        data={item as BookItem}
                        isEditMode={props.isEditMode}
                      ></ShelfImage>
                    ) : item.type === 2 ? (
                      <ShelfCategory
                        data={item as CategoryItem}
                        isEditMode={props.isEditMode}
                      ></ShelfCategory>
                    ) : (
                      <span className="icon-add icon"></span>
                    )}
                  </div>
                  <div className="book-title-wrapper">
                    <span className="book-title title-small">{item.title}</span>
                  </div>
                </div>
              </Flipped>
            ))}
        </Flipper>
      ) : null}

      <div
        className="book-shelf-statistics"
        style={{ display: props.showType === 0 ? 'block' : 'none' }}
      >
        {t('statistic', { $1: store.publicNumber, $2: store.privateNumber })}
      </div>
    </ShelfWrapper>
  ))
}

export default memo(ShelfCom)
