import React, { FC, memo } from 'react'
import { DetailTitleWrapper } from './style'
import classnames from 'classnames'

interface DetailTitle {
  showShelf: boolean
  title?: string
  onBack: () => void
}

const DetailTile: FC<DetailTitle> = (props) => {
  const { title, showShelf, onBack } = props

  return (
    <DetailTitleWrapper>
      <div
        className={classnames({
          'detail-title-wrapper': true,
          'hide-shadow': true,
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
}

export default memo(DetailTile)
