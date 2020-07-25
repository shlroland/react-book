import React, {
  forwardRef,
  FC,
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import BScroll from '@better-scroll/core'
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
  top: number
  bottom: number
  onScroll?: (...rest: any[]) => any
  className?: string | string[]
}

const Scroll: FC<ScrollProps> = forwardRef((props, ref) => {
  const { top, bottom, children } = props

  const Bs = useRef<BScroll>()

  const scrollWrapperDom = useRef<HTMLDivElement>(null)

  const computedHeight = useMemo(() => {
    return window.innerHeight - realPx(top) - realPx(bottom)
  }, [bottom, top])

  useEffect(() => {
    Bs.current = new BScroll(scrollWrapperDom.current as HTMLDivElement, {
      scrollY: true,
      click: true,
      probeType: 3, // listening scroll hook
    })
    console.log(Bs.current)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      Bs.current?.refresh()
    }, 20)
  })

  useImperativeHandle(
    ref,
    () => ({
      refresh: Bs.current?.refresh,
    }),
    []
  )

  return (
    <ScrollWrapper height={computedHeight} ref={scrollWrapperDom}>
      {children}
    </ScrollWrapper>
  )
})

Scroll.defaultProps = {
  top: 0,
  bottom: 0,
}

export default Scroll
