import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontSettingWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { FONT_SIZE_LIST } from '@/utils/book'
import {
  changeDefaultFontSize,
  changeFontFamilyVisible,
} from '../store/actionCreators'
import { saveFontSize } from '../../../utils/localStorage'

const EbookSettingFont = () => {
  const dispatch = useDispatch()
  const [styleLeft, setStyleLeft] = useState({})
  const [styleRight, setStyleRight] = useState({})

  const left = useRef(null)
  const leftText = useRef(null)
  const right = useRef(null)
  const rightText = useRef(null)
  const itemsRef = useRef([])

  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const defaultFontSize = useSelector((state) =>
    state.getIn(['ebook', 'defaultFontSize'])
  )
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const defaultFontFamily = useSelector((state) =>
    state.getIn(['ebook', 'defaultFontFamily'])
  )

  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))

  const setFontSize = useCallback(
    (fontSize) => {
      dispatch(changeDefaultFontSize(fontSize))
      saveFontSize(fileName, fontSize)
      if (currentBook) {
        currentBook.rendition.themes.fontSize(fontSize)
      }
    },
    [currentBook, dispatch, fileName]
  )

  const showFontFamilyVisible = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(changeFontFamilyVisible(true))
    },
    [dispatch]
  )

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, FONT_SIZE_LIST.length)
  }, [])

  useEffect(() => {
    if (settingVisible === 0) {
      const leftWidth = left.current.getBoundingClientRect().width
      const rightWidth = right.current.getBoundingClientRect().width
      const leftTextWidth = leftText.current.getBoundingClientRect().width
      const rightTextWidth = rightText.current.getBoundingClientRect().width
      const item = itemsRef.current[0].getBoundingClientRect().width
      setStyleLeft({
        marginLeft: (leftWidth + item - leftTextWidth) / 2 + 'px',
        fontSize: FONT_SIZE_LIST[0].fontSize + 'px',
      })
      setStyleRight({
        marginRight: (rightWidth + item - rightTextWidth) / 2 + 'px',
        fontSize: FONT_SIZE_LIST[FONT_SIZE_LIST.length - 1].fontSize + 'px',
      })
    }
  }, [settingVisible])

  return (
    <CSSTransition
      in={menuVisible && settingVisible === 0}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <FontSettingWrapper>
        <div className="setting-font-size">
          <div className="preview" ref={left}>
            <span style={styleLeft} ref={leftText}>
              A
            </span>
          </div>
          <div className="select">
            {FONT_SIZE_LIST.map((item, index) => {
              return (
                <div
                  className="select-wrapper"
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  onClick={() => setFontSize(item.fontSize)}
                >
                  <div className="line"></div>
                  <div className="point-wrapper">
                    {defaultFontSize === item.fontSize ? (
                      <div className="point">
                        <div className="small-point"></div>
                      </div>
                    ) : null}
                  </div>
                  <div className="line"></div>
                </div>
              )
            })}
          </div>
          <div className="preview" ref={right}>
            <span style={styleRight} ref={rightText}>
              A
            </span>
          </div>
        </div>
        <div className="setting-font-family">
          <div
            className="setting-font-family-text-wrapper"
            onClick={(e) => showFontFamilyVisible(e)}
          >
            <span className="setting-font-family-text">
              {defaultFontFamily}
            </span>
          </div>
          <div className="setting-font-family-icon-wrapper">
            <span className="icon-forward"></span>
          </div>
        </div>
      </FontSettingWrapper>
    </CSSTransition>
  )
}

export default EbookSettingFont
