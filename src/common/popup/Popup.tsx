import React, {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'
import { PopupWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

interface PopupProp {
  title: string
  confirmText: string
  isRemoveText: boolean
  cancelText: string
  thirdText?: string
  confirm: (...args: any) => any
  third?: (...args: any) => any
}

export interface RefProp {
  show: () => void
  hide: () => void
}

const Popup = forwardRef<RefProp, PopupProp>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  const {
    title,
    confirmText,
    isRemoveText,
    cancelText,
    thirdText,
    confirm,
    third,
  } = props

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

  const handleConfirm = () => {
    confirm()
    setTimeout(() => {
      hide()
    }, 20)
  }

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  let portalRoot: HTMLElement
  const element = document.getElementById('portal-root')
  if (element) {
    portalRoot = element
  } else {
    portalRoot = document.createElement('div')
    portalRoot.id = 'portal-root'
    document.body.appendChild(portalRoot)
  }

  return createPortal(
    <PopupWrapper style={{ display: visible ? 'block' : 'none' }}>
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
      >
        <div className="popup-wrapper">
          {title && title.length > 0 ? (
            <div className="popup-title">{title}</div>
          ) : null}
          {thirdText && thirdText.length > 0 ? (
            <div className="popup-confirm-btn" onClick={() => {
              if(third) {
                hide()
                setTimeout(()=>{
                  third()
                },250)
              }
            }}>
              {thirdText}
            </div>
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
    </PopupWrapper>,
    portalRoot
  )
})

export default Popup
