import React from 'react'
import { useSelector } from 'react-redux'
import { EbookTitleWrapper } from '../style/EbookTitle'

const EbookTitle = () => {
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )

  return menuVisible ? (
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
  ) : null
}

export default EbookTitle
