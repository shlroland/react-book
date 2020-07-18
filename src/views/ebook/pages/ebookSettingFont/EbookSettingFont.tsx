import React, {
  memo,
  FC,
  useRef,
  useEffect,
  useState,
  CSSProperties,
} from 'react'
import { FontSettingWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import { fontSizeList } from '@/utils/book'

const EbookTitle: FC = () => {
  const ebookStore = useEbookStore()

  const [styleLeft, setStyleLeft] = useState<CSSProperties>({})
  const [styleRight, setStyleRight] = useState({})

  const left = useRef<HTMLDivElement | null>(null)
  const leftText = useRef<HTMLSpanElement | null>(null)
  const right = useRef<HTMLDivElement | null>(null)
  const rightText = useRef<HTMLSpanElement | null>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>(
    Array(fontSizeList.length).fill(null)
  )

  // const showFontFamilyVisible = (e) => {
  //     e.preventDefault()
  //     dispatch(changeFontFamilyVisible(true))
  //   }

  useEffect(() => {
    if (ebookStore.fontSettingVisible) {
      const leftWidth = (left.current as HTMLDivElement).getBoundingClientRect()
        .width
      const rightWidth = (right.current as HTMLDivElement).getBoundingClientRect()
        .width
      const leftTextWidth = (leftText.current as HTMLSpanElement).getBoundingClientRect()
        .width
      const rightTextWidth = (rightText.current as HTMLSpanElement).getBoundingClientRect()
        .width
      const item = (itemsRef
        .current[0] as HTMLDivElement).getBoundingClientRect().width
      setStyleLeft({
        marginLeft: (leftWidth + item - leftTextWidth) / 2 + 'px',
        fontSize: fontSizeList[0].fontSize + 'px',
      })
      setStyleRight({
        marginRight: (rightWidth + item - rightTextWidth) / 2 + 'px',
        fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px',
      })
    }
  }, [ebookStore.fontSettingVisible])

  return useObserver(() => (
    <CSSTransition
      in={ebookStore.fontSettingVisible}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <FontSettingWrapper>
        <div className="setting-font-size">
          <div className="preview" ref={left}>
            <span style={styleLeft} ref={leftText}>
              A
            </span>
          </div>
          <div className="select">
            {fontSizeList.map((item, index) => {
              return (
                <div
                  className="select-wrapper"
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                >
                  <div className="line"></div>
                  <div className="point-wrapper">
                    {ebookStore.defaultFontSize === item.fontSize ? (
                      <div className="point">
                        <div className="small-point"></div>
                      </div>
                    ) : null}
                  </div>
                  <div className="line"></div>
                </div>
              )
            })}
          </div>
          <div className="preview" ref={right}>
            <span style={styleRight} ref={rightText}>
              A
            </span>
          </div>
        </div>
        <div className="setting-font-family">
          <div
            className="setting-font-family-text-wrapper"
            onClick={(e) => {
              e.preventDefault()
              ebookStore.changeFontFamilyVisible(true)
            }}
          >
            <span className="setting-font-family-text">
              {ebookStore.defaultFontFamily}
            </span>
          </div>
          <div className="setting-font-family-icon-wrapper">
            <span className="icon-forward"></span>
          </div>
        </div>
      </FontSettingWrapper>
    </CSSTransition>
  ))
}

export default memo(EbookTitle)
