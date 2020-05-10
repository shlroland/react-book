import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { mixin } from '@assets/style'
import PropTypes from 'prop-types'
import { realPx } from '../utils/utils'
import classnames from 'classnames'

const ScrollWrapper = styled.div`
  position: relative;
  z-index: 100;
  width: 100%;
  height: ${(props) => props.height}px;
  ${mixin.scroll()}
  &.no-scroll {
    overflow: hidden;
  }
`

const Scroll = (props) => {
  const { top, bottom, ifNoScroll, initPosition, onScroll, className } = props

  const scrollWrapperDom = useRef(null)

  const handleScroll = useCallback(
    (e) => {
      const offsetY =
        e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      onScroll(offsetY)
    },
    [onScroll]
  )
  const computedHeight = useMemo(() => {
    return window.innerHeight - realPx(top) - realPx(bottom)
  }, [bottom, top])

  // useEffect(() => {
  //   const scrollWrapper = document.getElementsByClassName(`class-${id}`)[0]
  //   // console.log(scrollWrapper)
  //   scrollWrapper.addEventListener('scroll', handleScroll)
  //   return () => scrollWrapper.removeEventListener('scroll', handleScroll)
  // }, [handleScroll, id])

  // const refresh = useCallback(() => {
  //   if (scrollWrapperDom) {
  //     scrollWrapperDom.current.style.height =
  //       window.innerHeight - realPx(top) - realPx(bottom)
  //     scrollWrapperDom.current.addEventListener('scroll', handleScroll, {
  //       passive: true,
  //     })
  //   }
  // }, [bottom, handleScroll, top])
  return (
    <ScrollWrapper
      height={computedHeight}
      className={classnames(...className)}

      onScroll={(e) => handleScroll(e)}
      ref={scrollWrapperDom}
    >
      {props.children}
    </ScrollWrapper>
  )
}

Scroll.defaultProps = {
  top: 0,
  bottom: 0,
  ifNoScroll: false,
  initPosition: { x: 0, y: 0 },
  onScroll: null,
  className: [],
}

Scroll.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
  ifNoScroll: PropTypes.bool,
  initPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onScroll: PropTypes.func,
  className: PropTypes.array,
}

export default Scroll
