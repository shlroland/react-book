import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import { mixin, px2vw } from '@assets/style'
import { CSSTransition } from 'react-transition-group'

const ToastWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -50%;
  z-index: 2500;
  width: 100%;
  &.fade-enter,
  &.fade-appear {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-appear-active {
    transition: all 0.5s linear;
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    transition: all 0.5s linear;
    opacity: 0;
  }
  ${mixin.center()};
  .toast-wrapper {
    width: 60%;
    line-height: ${px2vw(20)};
    padding: ${px2vw(10)} ${px2vw(20)};
    box-sizing: border-box;
    background: #ccc;
    border-radius: ${px2vw(10)};
    font-size: ${px2vw(14)};
    color: white;
    .toast {
      text-align: center;
      word-break: break-all;
    }
  }
`

const Toast = forwardRef((props, ref) => {
  const { text, timeout = 1500 } = props
  const [visible, setVisible] = useState(false)
  const task = useRef(null)
  const hide = () => {
    setVisible(false)
  }
  const show = () => {
    clearTimeout(task.current)
    task.current = null
    task.current = setTimeout(() => {
      setVisible(false)
    }, timeout)
    setVisible(true)
  }

  const continueShow = () => {
    clearTimeout(task.current)
    task.current = null
    setVisible(true)
  }

  useImperativeHandle(ref, () => ({
    hide,
    show,
    continueShow,
  }))

  return (
    <CSSTransition
      in={visible}
      timeout={500}
      classNames="fade"
      appear={true}
      unmountOnExit
    >
      <ToastWrapper>
        <div className="toast-wrapper">
          <div
            className="toast"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
      </ToastWrapper>
    </CSSTransition>
  )
})

export default Toast
