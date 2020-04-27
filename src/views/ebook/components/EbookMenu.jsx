import React from 'react'
import { EbookMenuWrapper } from '../style/EbookMenu'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

const EbookMenu = () => {
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )

  return (
    <CSSTransition
      in={menuVisible}
      timeout={500}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <EbookMenuWrapper>
          <div className="icon-wrapper">
            <span className="icon-menu"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-progress"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-bright"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-A"></span>
          </div>
      </EbookMenuWrapper>
    </CSSTransition>
  )
}

export default EbookMenu
