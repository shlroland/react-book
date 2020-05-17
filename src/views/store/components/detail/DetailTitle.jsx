import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { DetailTitleWrapper } from './style'
import classnames from 'classnames'

const DetailTile = forwardRef((props, ref) => {
  const { title, showShelf, onBack } = props
  const [isHideShadow, setIsHideShadow] = useState(true)

  useImperativeHandle(ref, () => ({
    showShadow() {
      setIsHideShadow(false)
    },
    hideShadow() {
      setIsHideShadow(true)
    },
  }))

  return (
    <DetailTitleWrapper>
      <div
        className={classnames({
          'detail-title-wrapper': true,
          'hide-shadow': isHideShadow,
        })}
      >
        <div className="title-left-wrapper" onClick={() => onBack()}>
          <span className="icon-back"></span>
        </div>
        <div className="title-right-wrapper">
          {showShelf ? (
            <span className="icon-shelf icon"></span>
          ) : (
            <span className="icon-share"></span>
          )}
        </div>
        {title ? <div className="title-text">{title}</div> : null}
      </div>
    </DetailTitleWrapper>
  )
})

export default DetailTile
