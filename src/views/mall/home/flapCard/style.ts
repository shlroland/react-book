import styled, { keyframes } from 'styled-components'
import { px2vw, mixin } from '@/assets/styles'

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
