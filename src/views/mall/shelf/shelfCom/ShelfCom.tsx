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
interface ShelfComProp {
  data: BookList
  showType: number
  isEditMode: boolean
}

const ShelfCom: FC<ShelfComProp> = (props) => {
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
    </ShelfWrapper>
  ))
}

export default memo(ShelfCom)
