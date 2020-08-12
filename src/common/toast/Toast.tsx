import React, { memo, ReactNode, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mixin, px2vw } from '@/assets/styles'
import { createPortal } from 'react-dom'
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

const useToast = (timeout = 1500) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const task = useRef(0)

  const showToast = (text: string) => {
    clearTimeout(task.current)
    task.current = 0
    setText(text)
    task.current = setTimeout(() => {
      setVisible(false)
    }, timeout)
    setVisible(true)
  }

  const hideToast = () => {
    setVisible(false)
  }

  let portalRoot: HTMLElement
  const element = document.getElementById('portal-root')
  if (element) {
    portalRoot = element
  } else {
    portalRoot = document.createElement('div')
    portalRoot.id = 'portal-root'
    document.body.appendChild(portalRoot)

  }
  const RenderToast = () =>
    createPortal(
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
      </CSSTransition>,
      portalRoot
    )

  return {
    showToast,
    hideToast,
    RenderToast,
  }
}

export default useToast