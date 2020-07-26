import React, {
  forwardRef,
  FC,
  useMemo,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { mixin, realPx } from '@/assets/styles'

const ScrollWrapper = styled.div<{ height: number }>`
  position: relative;
  z-index: 100;
  width: 100%;
  height: ${(props) => props.height}px;
  ${mixin.scroll()}
`

interface ScrollProps {
  top?: number
  bottom?: number
  onScroll?: (...rest: any[]) => any
  className?: string | string[]
}

const Scroll: FC<ScrollProps> = forwardRef((props, ref) => {
  const { top, bottom, children,onScroll } = props

  const scrollWrapperDom = useRef<HTMLDivElement>(null)

  const computedHeight = useMemo(() => {
    return window.innerHeight - realPx(top!) - realPx(bottom!)
  }, [bottom, top])

  const handleScroll = useCallback(
    (e) => {
      const offsetY =
        e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      if (onScroll) {
        onScroll(offsetY)
      }
    },
    [onScroll]
  )

  const refresh = useCallback(() => {
    if (scrollWrapperDom.current instanceof HTMLDivElement) {
      scrollWrapperDom.current.style.height =
        `${window.innerHeight - realPx(top!) - realPx(bottom!)}`
    }
  }, [bottom, top])

  useImperativeHandle(
    ref,
    () => ({
      refresh
    }),
    [refresh]
  )

  return (
    <ScrollWrapper height={computedHeight} ref={scrollWrapperDom} onScroll={(e) => handleScroll(e)}>
      {children}
    </ScrollWrapper>
  )
})

Scroll.defaultProps = {
  top: 0,
  bottom: 0,
}

export default Scroll
