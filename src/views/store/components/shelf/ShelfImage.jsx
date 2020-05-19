import React from 'react'
import classnames from 'classnames'
import {ShelfImageWrapper} from './style'

const ShelfImage = ({ data, isEditMode }) => {
  return (
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
  )
}

export default ShelfImage
