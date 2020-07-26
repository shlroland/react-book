import React, { useState, memo, FC, useCallback } from 'react'
import { TitleWrapper } from './style'
import classnames from 'classnames'

interface titleProp {
  label: string
  btn: string
  onChange: () => void
}

const Title: FC<titleProp> = ({ label, btn, onChange }) => {
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

export default memo(Title)
