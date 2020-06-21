import React, { memo, useMemo, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { mixin, px2vw } from '@assets/style'

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

const Toast = memo(({ children }) => {
  const portalRoot = document.getElementById('portal-root')
  const toastContainer = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    portalRoot.appendChild(toastContainer)
    return () => {
      toastContainer.remove()
    }
  })

  if (!portalRoot) return null
  return createPortal(children, portalRoot)
})

const useToast = (timeout = 1500) => {
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState('')
  const task = useRef(null)

  const showToast = (text) => {
    clearTimeout(task.current)
    task.current = null
    setText(text)
    task.current = setTimeout(() => {
      setIsVisible(false)
    }, timeout)
    setIsVisible(true)
  }

  const hideToast = () => {
    setIsVisible(false)
  }

  const RenderToast = () => (
    <>
      {isVisible && (
        <Toast>
          <ToastWrapper>
            <div className="toast-wrapper">
              <div
                className="toast"
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </div>
          </ToastWrapper>
        </Toast>
      )}
    </>
  )

  return {
    showToast,
    hideToast,
    RenderToast,
  }
}

export default useToast
