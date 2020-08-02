import styled from 'styled-components'
import { px2vw, mixin } from '@/assets/styles'

export const ShelfTitleWrapper = styled.div`
  position: relative;
  z-index: 120;
  width: 100%;
  height: ${px2vw(42)};
  background: white;
  box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: ${px2vw(42)};
    ${mixin.columnCenter()};
    .title-text {
      font-size: ${px2vw(16)};
      line-height: ${px2vw(20)};
      font-weight: bold;
      color: #333;
    }
    .sub-title-text {
      font-size: ${px2vw(10)};
      color: #333;
    }
  }
  .btn-text-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 115;
    padding-right: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    ${mixin.center()};
    .btn-text {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
  .btn-clear-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 115;
    padding-left: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    ${mixin.center()};
    .btn-clear {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
  .btn-back-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 115;
    padding-left: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    font-size: ${px2vw(20)};
    color: #666;
    ${mixin.center()};
    &:active {
      color: rgba(102, 102, 102, 0.5);
    }
    .btn-text {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
`
