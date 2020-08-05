import React, { FC } from 'react'
import classnames from 'classnames'
import { ShelfCategoryWrapper } from './style'
import { CategoryItem } from '../types'

interface ShelfCategoryProp {
  data: CategoryItem
  isEditMode: boolean
}

const ShelfCategory: FC<ShelfCategoryProp> = ({ data, isEditMode }) => {
  return (
    <ShelfCategoryWrapper>
      {data.itemList.length > 0 ? (
        <div
          className={classnames({
            'shelf-category': true,
            'is-edit': isEditMode,
          })}
        >
          {data.itemList.map((item, index) => {
            return (
              <div className="shelf-category-item" key={item.id}>
                <img
                  className="shelf-category-img"
                  src={item.cover}
                  alt="无图"
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="shelf-category-bg">
          <span className="icon-book2"></span>
        </div>
      )}
    </ShelfCategoryWrapper>
  )
}

export default ShelfCategory
