import React from 'react'
import classnames from 'classnames'
import { CategoryImageWrapper } from './style'

const ShelfImage = ({ data, isEditMode }) => {
  return (
    <CategoryImageWrapper>
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
        <div className="private-icon-wrapper">
          <span className="icon-private"></span>
        </div>
      ) : null}
    </CategoryImageWrapper>
  )
}

export default ShelfImage
