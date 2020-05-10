import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import {title} from './transition'

export const SearchBarWrapper = styled.div`
  .title-search-wrapper {
    position: relative;
    z-index: 110;
    width: 100%;
    height: ${px2vw(94)};
    background: white;
    box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.1);
    &.show-search {
      height: ${px2vw(52)};
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .title-search-page-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 105;
      width: 100%;
      height: ${px2vw(42)};
      ${title()}
      ${mixin.center()};
      .title-text {
        font-weight: bold;
      }
      .icon-shake-wrapper {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 110;
        padding-right: ${px2vw(15)};
        height: 100%;
        ${mixin.center()};
      }
    }
    .icon-back-wrapper {
      position: absolute;
      left: ${px2vw(15)};
      top: 0;
      z-index: 110;
      height: ${px2vw(42)};
      ${mixin.center()};
      transition: all.3s linear;
      &.show-search {
        height: ${px2vw(52)};
      }
    }
    .search-wrapper {
      position: absolute;
      top: ${px2vw(42)};
      left: 0;
      z-index: 100;
      display: flex;
      padding: ${px2vw(10)};
      width: 100%;
      box-sizing: border-box;
      transition: all.3s linear;
      &.show-search {
        top: 0;
      }
      .search-back-wrapper {
        flex: 0;
        width: 0;
        ${mixin.center()};
        transition: all.3s linear;
        visibility: hidden;
        &.show-search {
          margin-right: ${px2vw(10)};
          flex: 0 0 ${px2vw(20)};
          width: ${px2vw(20)};
        }
        .icon-back {
          font-size: 0;
          &.show-search {
            font-size: ${px2vw(20)};
          }
        }
      }
      .search-bg {
        flex: 1;
        background: #f4f4f4;
        border-radius: ${px2vw(20)};
        border: ${px2vw(1)} solid #eee;
        box-sizing: border-box;
        padding: ${px2vw(5)} ${px2vw(15)};
        transition: all.3s linear;
        ${mixin.left()};
        .icon-search {
          font-size: ${px2vw(16)};
          color: #999;
        }
        .search {
          color: #666;
          width: 100%;
          height: ${px2vw(22)};
          background: transparent;
          font-size: ${px2vw(12)};
          margin-left: ${px2vw(10)};
          border: none;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .line {
      width: 100%;
      height: 0;
      border-top: ${px2vw(1)} solid #eee;
      margin: ${px2vw(10)} 0;
    }
  }
`
