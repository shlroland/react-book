import React, { memo, FC } from 'react'
import EbookTitleWrapper from './style'

const EbookTitle: FC = () => {
  return (
    <EbookTitleWrapper>
      <div className="left">
        <span className="icon-back"></span>
      </div>
      <div className="right">
        <div className="icon-wrapper">
          <span className="icon-shelf"></span>
        </div>
        <div className="icon-wrapper">
          <span className="icon-cart"></span>
        </div>
        <div className="icon-wrapper">
          <span className="icon-more"></span>
        </div>
      </div>
    </EbookTitleWrapper>
  )
}

export default memo(EbookTitle)
