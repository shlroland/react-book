import React, { useMemo, useRef, useEffect,memo } from 'react'
import styled from 'styled-components'
import { mixin } from '@assets/style'
import move from '@/assets/style/flapCard'

const PointWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2000;
  ${mixin.center()};
  .point {
    ${mixin.absCenter()};
    z-index: 3000;
    border-radius: 50%;
    /* transform: scale(0); */
    /* &.animation {
        @for $i from 1 to length($moves) + 1 {
          &:nth-child(#{$i}) {
            @include move($i);
          }
        }
      } */
  }
`

const FirePoints = () => {
  const pointsRef = useRef([])
  const pointList = useMemo(() => {
    return new Array(18).fill(null).map((_item, index) => {
      return { ...move(index) }
    })
  }, [])

  console.log(pointList)

  useEffect(() => {
    pointsRef.current = pointsRef.current.slice(0, pointList.length)
  }, [pointList.length])

  useEffect(()=>{
      pointsRef.current.forEach((item,index)=>{
        item.animate(pointList[index].keyframe,pointList[index].animation)
      })
  },[pointList])

  return (
    <PointWrapper>
      {pointList.map((item, index) => {
        return (
          <div
            className="point"
            key={item.animation.id}
            style={{
              width: item.width,
              height: item.height,
              background: item.background,
            }}
            ref={(el) => (pointsRef.current[index] = el)}
          ></div>
        )
      })}
    </PointWrapper>
  )
}

export default memo(FirePoints)
