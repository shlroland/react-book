import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import { PopupWrapper } from './style'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'

const Popup = forwardRef((props, ref) => {
  const {
    title,
    confirmText,
    isRemoveText,
    cancelText,
    thirdText,
    confirm,
  } = props
  const [visible, setVisible] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  // console.log(title, confirmText, isRemoveText, cancelText, confirm)

  const show = useCallback(() => {
    setVisible(true)
    setPopupVisible(true)
  }, [])

  const hide = useCallback(() => {
    setPopupVisible(false)
    setTimeout(() => {
      setVisible(false)
    }, 200)
  }, [])

  const handleConfirm = useCallback(()=>{
    hide()
    setTimeout(()=>{
      confirm()
    },[])
  },[confirm, hide])

  useImperativeHandle(ref, () => ({
    show,
  }))
  return (
    <>
      {visible ? (
        <PopupWrapper>
          <div
            className="popup-bg"
            style={{
              display: popupVisible ? 'block' : 'none',
            }}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              hide()
            }}
            onTouchMove={(e) => {
              e.preventDefault()
            }}
          ></div>
          <CSSTransition
            in={popupVisible}
            timeout={500}
            classNames="popup-slide-up"
            appear={true}
            unmountOnExit
          >
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
                onClick={() => handleConfirm()}
              >
                {confirmText}
              </div>
              <div className="popup-cancel-btn" onClick={() => hide()}>
                {cancelText}
              </div>
            </div>
          </CSSTransition>
        </PopupWrapper>
      ) : null}
    </>
  )
})

export default Popup
