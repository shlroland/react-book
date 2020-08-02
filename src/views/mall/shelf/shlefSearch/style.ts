import styled from 'styled-components'
import { px2vw, mixin } from '@/assets/styles'

export const ShelfSearchWrapper = styled.div`
  position: relative;
  z-index: 105;
  width: 100%;
  height: ${px2vw(94)};
  font-size: ${px2vw(16)};
  background: white;
  box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.1);
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-search {
    position: absolute;
    top: ${px2vw(42)};
    left: 0;
    z-index: 101;
    width: 100%;
    height: ${px2vw(52)};
    display: flex;
    transition: all 0.5s linear;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      display: flex;
      flex: 1;
      margin: ${px2vw(8)} 0 ${px2vw(8)} ${px2vw(10)};
      border: ${px2vw(1)} solid #ccc;
      border-radius: ${px2vw(3)};
      .icon-search-wrapper {
        flex: 0 0 ${px2vw(22)};
        ${mixin.right()};
        .icon-search {
          font-size: ${px2vw(12)};
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 ${px2vw(10)};
        box-sizing: border-box;
        ${mixin.center()};
        .search-input {
          width: 100%;
          font-size: ${px2vw(14)};
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: ${px2vw(14)};
            color: #ccc;
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 ${px2vw(24)};
        ${mixin.left()};
        .icon-close-circle-fill {
          font-size: ${px2vw(14)};
          color: #ccc;
        }
      }
    }
    .icon-clock-wrapper {
      flex: 0 0 ${px2vw(55)};
      ${mixin.center()};
      .icon-cn,
      .icon-en {
        font-size: ${px2vw(22)};
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 ${px2vw(55)};
      ${mixin.center()};
      .cancel-btn {
        font-size: ${px2vw(14)};
        color: ${mixin.variableColor['$colorBlue']};
      }
    }
  }
  .tab-wrapper {
    position: absolute;
    top: ${px2vw(52)};
    left: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: ${px2vw(42)};
    .tab-item {
      flex: 1;
      ${mixin.center()};
      .tab-item-text {
        font-size: ${px2vw(12)};
        color: #999;
        &.is-selected {
          color: ${mixin.variableColor['$colorBlue']};
        }
      }
    }
  }
`
