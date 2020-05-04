import React from 'react'
import styled, { keyframes } from 'styled-components'
import { px2vw, mixin } from '@assets/style'

const loading = keyframes`
0%,100% {
    width: ${px2vw(16)};
}
50% {
    width: ${px2vw(0)};
}
`

const loading2 = keyframes`
0%,100% {
    width: ${px2vw(0)};
}
50% {
    width: ${px2vw(16)};
}
`

const EbookLoadingWrapper = styled.div`
  position: relative;
  z-index: 500;
  width: ${px2vw(63)};
  height: ${px2vw(40)};
  background: transparent;
  border: ${px2vw(1.5)} solid #d7d7d7;
  border-radius: ${px2vw(3)};
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: ${px2vw(7)} 0;
      box-sizing: border-box;
      overflow: hidden;
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 ${px2vw(7)};
        box-sizing: border-box;
        ${mixin.left()}
        .ebook-loading-line {
          /* flex: 0 0 ${px2vw(16)}; */
          /* width: ${px2vw(16)}; */
          height: ${px2vw(1.5)};
          background: #d7d7d7;
          &.col-1{
            animation: ${loading} 1s infinite linear;
          }
          &.col-2{
            animation: ${loading} 1s infinite linear 0.5s;
          }
          &.col-3{
            animation: ${loading2} 1s infinite linear 0.75s;
          }
          &.col-4{
            animation: ${loading2} 1s infinite linear;
          }
          &.col-5{
            animation: ${loading2} 1s infinite linear 0.5s;
          }
          &.col-6{
            width: ${px2vw(16)};
            animation: ${loading} 1s infinite linear 0.75s;
          }
          
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: ${px2vw(1.5)};
      height: 100%;
      background: #d7d7d7;
    }
  }
`

const EbookLoading = () => {
  return (
    <EbookLoadingWrapper>
      <div className="ebook-loading-wrapper">
        <div className="ebook-loading-item">
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-1"></div>
          </div>
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-2"></div>
          </div>
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-3"></div>
          </div>
        </div>
        <div className="ebook-loading-item">
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-4"></div>
          </div>
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-5"></div>
          </div>
          <div className="ebook-loading-line-wrapper">
            <div className="ebook-loading-line col-6"></div>
          </div>
        </div>
        <div className="ebook-loading-center"></div>
      </div>
    </EbookLoadingWrapper>
  )
}

export default EbookLoading
