import React, { FC, memo } from 'react'
import { HotSearchWrapper } from './style'

interface HotSearchProp {
  label: string
  btn: string
  hotSearch:
    | {
        type: number
        text: string
        num?: string
      }[]
}

const HotSearch: FC<HotSearchProp> = ({ label, btn, hotSearch }) => {
  return (
    <HotSearchWrapper>
      <div className="hot-search-title">
        <span className="label">{label}</span>
        <span className="btn">{btn}</span>
      </div>
      <div className="hot-search-list">
        {hotSearch.map((item, index) => {
          return (
            <div className="hot-search-item" key={index}>
              <div className="icon-wrapper">
                {item.type === 1 ? (
                  <span className="icon-book icon"></span>
                ) : null}
                {item.type === 2 ? (
                  <span className="icon-search icon"></span>
                ) : null}
              </div>
              <div className="hot-search-text-wrapper">
                <div className="text">{item.text}</div>
                {item.num ? <div className="num">{item.num}人搜索</div> : null}
              </div>
            </div>
          )
        })}
      </div>
    </HotSearchWrapper>
  )
}

export default memo(HotSearch)
