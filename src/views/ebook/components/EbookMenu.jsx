import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { changeSettingVisible } from '../store/actionCreators'

import { EbookMenuWrapper } from '../style'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'

const EbookMenu = () => {
  const dispatch = useDispatch()
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const hideBoxShadow = useMemo(()=>(
    settingVisible >= 0 || !menuVisible
  ),[menuVisible, settingVisible])

  const toggleSettingVisibleDispatch = (data) => {
    dispatch(changeSettingVisible(data))
  }

  return (
    <>
      <CSSTransition
        in={menuVisible}
        timeout={500}
        classNames="slide-up"
        appear={true}
        unmountOnExit
      >
        <EbookMenuWrapper hideBoxShadow={hideBoxShadow}>
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
            <span
              className="icon-A"
              onClick={() => toggleSettingVisibleDispatch(0)}
            ></span>
          </div>
        </EbookMenuWrapper>
      </CSSTransition>
      <EbookSettingFont></EbookSettingFont>
      <EbookSettingFontPopup></EbookSettingFontPopup>
    </>
  )
}

export default EbookMenu
