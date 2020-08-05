import React, { FC, memo } from 'react'
import classnames from 'classnames'
import { BookItem } from '../types'
import { ShelfImageWrapper } from './style'
import { useObserver } from 'mobx-react'

interface ShelfImageProp {
  data: BookItem
  isEditMode: boolean
}

const ShelfImage: FC<ShelfImageProp> = ({ data, isEditMode }) => {
  return useObserver(() => (
    <ShelfImageWrapper>
      <img className="book-img" src={data.cover} alt="无图" />
      {isEditMode ? (
        <span
          className={classnames({
            'icon-selected': true,
            'is-selected': data.selected,
          })}
        ></span>
      ) : null}
      {data.private ? <div className="private-wrapper"></div> : null}
      {data.private ? (
        <div className="private-icon-wrapper" v-show="data.private">
          <span className="icon-private"></span>
        </div>
      ) : null}
    </ShelfImageWrapper>
  ))
}

export default memo(ShelfImage)
