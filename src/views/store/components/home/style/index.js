import styled, { keyframes } from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import { title, hotSearch } from './transition'
import { realPx } from '@/utils/utils'

const flapCardMove = keyframes`
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      75% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
`

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
    ${hotSearch()};
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
export const HotSearchWrapper = styled.div`
  .hot-search-title {
    display: flex;
    width: 100%;
    font-size: ${px2vw(13)};
    padding: ${px2vw(10)};
    box-sizing: border-box;
    .label {
      flex: 1;
      text-align: left;
      font-weight: bold;
      color: #666;
    }
    .btn {
      flex: 1;
      text-align: right;
      font-weight: bold;
      color: #409eff;
    }
  }
  .hot-search-list {
    width: 100%;
    padding: 0 ${px2vw(10)};
    box-sizing: border-box;
    .hot-search-item {
      padding: ${px2vw(10)} 0;
      display: flex;
      .icon-wrapper {
        flex: 0 0 ${px2vw(40)};
        ${mixin.center()};
        .icon-book {
          font-size: ${px2vw(16)};
        }
        .icon-search {
          font-size: ${px2vw(16)};
        }
      }
      .hot-search-text-wrapper {
        flex: 1;
        height: ${px2vw(35)};
        ${mixin.columnLeft()};
        .text {
          flex: 1;
          height: 100%;
          ${mixin.ellipsis()};
          ${mixin.left()};
          width: ${() => {
            return window.innerWidth - realPx(20) - realPx(40) + 'px'
          }};
          font-size: ${px2vw(14)};
          font-weight: bold;
          color: #666;
        }
        .num {
          font-size: ${px2vw(12)};
          color: #999;
          margin-top: ${px2vw(5)};
        }
      }
    }
  }
`
export const FlapCardWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  ${mixin.center()};
  .flap-card-bg {
    position: relative;
    width: ${px2vw(64)};
    height: ${px2vw(64)};
    background: white;
    border-radius: ${px2vw(5)};
    transform: scale(0);
    opacity: 0;
    &.animation {
      animation: ${flapCardMove} 0.3s ease-in both;
    }
    /* @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      75% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    } */
    .flap-card {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1500;
      margin: auto;
      width: ${px2vw(48)};
      height: ${px2vw(48)};
      .flap-card-semi-circle {
        width: 100%;
        height: 100%;
        display: flex;
        .flap-card-semi-circle-left {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-color: #ffc666;
          background-repeat: no-repeat;
          background-position: center right;
          border-radius: ${px2vw(24)} 0 0 ${px2vw(24)};
          transform-origin: right;
          backface-visibility: hidden;
        }
        .flap-card-semi-circle-right {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center left;
          border-radius: 0 ${px2vw(24)} ${px2vw(24)} 0;
          transform-origin: left;
          backface-visibility: hidden;
        }
      }
    }
    .point-wrapper {
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
    }
  }
  .book-card {
    position: relative;
    width: 65%;
    box-sizing: border-box;
    border-radius: ${px2vw(15)};
    background: white;
    &.animation {
      animation: scale 0.3s ease-in both;
      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper {
      width: 100%;
      height: 100%;
      margin-bottom: ${px2vw(30)};
      ${mixin.columnTop()};
      .img-wrapper {
        width: 100%;
        margin-top: ${px2vw(20)};
        ${mixin.center()};
        .img {
          width: ${px2vw(90)};
          height: ${px2vw(130)};
        }
      }
      .content-wrapper {
        padding: 0 ${px2vw(20)};
        margin-top: ${px2vw(20)};
        .title {
          color: #333;
          font-weight: bold;
          font-size: ${px2vw(18)};
          line-height: ${px2vw(20)};
          max-height: ${px2vw(40)};
          text-align: center;
          ${mixin.ellipsis2(2)};
        }
        .author {
          margin-top: ${px2vw(10)};
          text-align: center;
        }
        .category {
          color: #999;
          font-size: ${px2vw(14)};
          margin-top: ${px2vw(10)};
          text-align: center;
        }
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 ${px2vw(15)} ${px2vw(15)};
        padding: ${px2vw(15)} 0;
        text-align: center;
        color: white;
        font-size: ${px2vw(14)};
        background: #4aabff;
      }
    }
  }
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: 5%;
    z-index: 1100;
    width: 100%;
    ${mixin.center()};
    .icon-close {
      display: inline-block;
      width: ${px2vw(45)};
      height: ${px2vw(45)};
      font-size: ${px2vw(25)};
      color: white;
      background: #333;
      border-radius: 50%;
      ${mixin.center()};
    }
  }
`
