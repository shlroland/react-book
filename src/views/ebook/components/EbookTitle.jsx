import React from 'react'
import { useSelector } from 'react-redux'
import { EbookTitleWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'

const EbookTitle = () => {
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )

  return (
    <CSSTransition
    in={menuVisible}
    timeout={300}
    classNames="slide-down"
    appear={true}
    unmountOnExit
    >
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
    </CSSTransition>
  )
}

export default EbookTitle
