import React, { useState } from 'react'
import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import classnames from 'classnames'
import { useCallback } from 'react'

const TitleWrapper = styled.div`
  width: 100%;
  padding: ${px2vw(15)} ${px2vw(10)};
  box-sizing: border-box;
  ${mixin.top()}
  .label {
    flex: 1;
    font-size: ${px2vw(18)};
    color: #333;
    font-weight: bold;
  }
  .btn {
    font-size: ${px2vw(14)};
    color: rgba(64, 158, 255, 1);
    &.touch {
      color: rgba(64, 158, 255, 0.5);
    }
  }
`

const Title = ({ label, btn, onChange }) => {
  const [isOnTouch, setIsOnTouch] = useState(false)

  const handleTouchStart = useCallback(() => {
    setIsOnTouch(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsOnTouch(false)
  }, [])

  const handleChange = useCallback(() => {
    onChange()
  }, [onChange])

  return (
    <TitleWrapper>
      <div className="label">{label}</div>
      <div
        className={classnames({
          btn: true,
          touch: isOnTouch,
        })}
        onTouchStart={() => handleTouchStart()}
        onTouchEnd={() => handleTouchEnd()}
        onMouseDown={() => handleTouchStart()}
        onMouseUp={() => handleTouchEnd()}
        onClick={() => handleChange()}
      >
        {btn}
      </div>
    </TitleWrapper>
  )
}

export default Title
