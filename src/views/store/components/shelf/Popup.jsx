import React, { useState, forwardRef, useImperativeHandle,useCallback } from 'react'
import { PopupWrapper } from './style'
import classnames from 'classnames'

const Popup = (props, ref) => {
  const { title, confirmText, isRemoveText, cancelText, thirdText } = props
  const [visible, setVisible] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  const show = useCallback(()=>{
    setVisible(true)
    setPopupVisible(true)
  },[])

  useImperativeHandle(ref, () => ({
    show,
  }))
  return (
    <>
      {visible ? (
        <PopupWrapper>
          {popupVisible ? <div className="popup-bg"></div> : null}
          {popupVisible ? (
            <div className="popup-wrapper">
              {title && title.length > 0 ? (
                <div className="popup-title">{title}</div>
              ) : null}
              {thirdText && thirdText.length > 0 ? (
                <div className="popup-confirm-btn">{thirdText}</div>
              ) : null}
              <div
                className={classnames({
                  'popup-confirm-btn': true,
                  'is-remove': isRemoveText,
                })}
              >
                {confirmText}
              </div>
              <div className="popup-cancel-btn">{cancelText}</div>
            </div>
          ) : null}
        </PopupWrapper>
      ) : null}
    </>
  )
}

export default forwardRef(Popup)
