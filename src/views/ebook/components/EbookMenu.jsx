import React from 'react'
import { EbookMenuWrapper } from '../style/EbookMenu'
import { useSelector } from 'react-redux'

const EbookMenu = () => {

  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )

  return menuVisible ? (
    <EbookMenuWrapper>
      <div className="menu-wrapper">
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
      </div>
    </EbookMenuWrapper>
  ) : null
}

export default EbookMenu
