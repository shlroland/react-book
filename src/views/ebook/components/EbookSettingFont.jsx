import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SettingWrapper } from '../style/EbookSettingFont'
import { CSSTransition } from 'react-transition-group'
import { FONT_SIZE_LIST } from '@/utils/book'

const EbookSettingFont = () => {
//   const [styleLeft, setStyleLeft] = useState({})

  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )

//   useEffect(() => {
//       setStyleLeft()
//   }, []);

  return (
    <CSSTransition
      in={menuVisible && settingVisible === 0}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <SettingWrapper>
        <div className="setting-font-size">
          <div className="preview">
            <span>A</span>
          </div>
          <div className="select">
            {FONT_SIZE_LIST.map((item, index) => {
              return (
                <div className="select-wrapper" key={index}>
                  <div className="line"></div>
                  <div className="point-wrapper">
                    <div className="point">
                      <div className="small-point"></div>
                    </div>
                  </div>
                  <div className="line"></div>
                </div>
              )
            })}
            {/* <div className="select-wrapper">
              <div className="line"></div>
              <div className="point-wrapper">
                <div className="point">
                  <div className="small-point"></div>
                </div>
              </div>
              <div className="line"></div>
            </div> */}
          </div>
          <div className="preview">
            <span>A</span>
          </div>
        </div>
        <div className="setting-font-family">
          <div className="setting-font-family-text-wrapper">
            <span className="setting-font-family-text"></span>
          </div>
          <div className="setting-font-family-icon-wrapper">
            <span className="icon-forward"></span>
          </div>
        </div>
      </SettingWrapper>
    </CSSTransition>
  )
}

export default EbookSettingFont
