import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { ModalWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'

const Modal = forwardRef((props, ref) => {
  const { content, confirm } = props
  const { t } = useTranslation('shelf')
  const [modalVisible, setModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const hide = useCallback(() => {
    setModalVisible(false)
    setTimeout(() => {
      setVisible(false)
    }, 200)
  }, [])
  const show = useCallback(() => {
    setVisible(true)
    setModalVisible(true)
  }, [])
  const handleConfirm = useCallback(()=>{
      confirm()
  },[confirm])
  useImperativeHandle(ref, () => ({
    show,
  }))
  return (
    <ModalWrapper style={{ display: visible ? 'block' : 'none' }}>
      <div
        className="modal-bg"
        style={{
          display: modalVisible ? 'block' : 'none',
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
        in={modalVisible}
        timeout={500}
        classNames="fade"
        appear={true}
      >
        <div className="modal-box">
          <div className="modal-content">{content}</div>
          <div className="modal-bottom">
            <div className="modal-bottom-left" onClick={() => hide()}>
              {t('cancel')}
            </div>
            <div className="modal-bottom-gap"></div>
            <div className="modal-bottom-right" onClick={() => handleConfirm()}>
              {t('confirm')}
            </div>
          </div>
        </div>
      </CSSTransition>
    </ModalWrapper>
  )
})

export default Modal
