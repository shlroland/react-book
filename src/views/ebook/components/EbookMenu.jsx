import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { changeSettingVisible } from '../store/actionCreators'

import { EbookMenuWrapper } from '../style'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'

const EbookMenu = () => {
  const dispatch = useDispatch()
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const hideBoxShadow = useMemo(() => settingVisible >= 0 || !menuVisible, [
    menuVisible,
    settingVisible,
  ])

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
          <div
            className="icon-wrapper"
            onClick={() => toggleSettingVisibleDispatch(3)}
          >
            <span className="icon-menu"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => toggleSettingVisibleDispatch(2)}
          >
            <span className="icon-progress"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => toggleSettingVisibleDispatch(1)}
          >
            <span className="icon-bright"></span>
          </div>
          <div
            className="icon-wrapper"
            onClick={() => toggleSettingVisibleDispatch(0)}
          >
            <span className="icon-A"></span>
          </div>
        </EbookMenuWrapper>
      </CSSTransition>
      <EbookSettingFont></EbookSettingFont>
      <EbookSettingFontPopup></EbookSettingFontPopup>
      <EbookSettingTheme></EbookSettingTheme>
      <EbookSettingProgress></EbookSettingProgress>
      <EbookSlide></EbookSlide>
    </>
  )
}

export default EbookMenu
