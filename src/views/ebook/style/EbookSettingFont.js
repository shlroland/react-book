import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'

export const SettingWrapper = styled.div`
  position: absolute;
  bottom: ${px2vw(48)};
  left: 0;
  z-index: 190;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${px2vw(90)};
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  &.slide-up-enter,
  &.slide-up-appear {
    transform: translate3d(0, ${px2vw(138)}, 0);
  }
  &.slide-up-enter-active,
  &.slide-up-appear-active {
    transition: all 0.3s linear;
    transform: translate3d(0, 0, 0);
  }
  &.slide-up-exit {
    transform: translate3d(0, 0, 0);
  }
  &.slide-up-exit-active {
    transition: all 0.3s linear;
    transform: translate3d(0, ${px2vw(138)}, 0);
  }
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 ${px2vw(40)};
      ${mixin.center()}
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: 1px solid #acadaf;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: ${px2vw(7)};
          border-left: 1px solid #acadaf;
          .point {
            position: absolute;
            top: ${px2vw(-8)};
            left: ${px2vw(-10)};
            width: ${px2vw(20)};
            height: ${px2vw(20)};
            border-radius: 50%;
            box-shadow: 0 ${px2vw(4)} ${px2vw(4)} rgba(0, 0, 0, 0.15);
            background: #cecece;
            border: 1px solid #ccc;
            ${mixin.center()}
            .small-point {
              width: ${px2vw(5)};
              height: ${px2vw(5)};
              border-radius: 50%;
              background-color: #5d6268;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: ${px2vw(14)};
    ${mixin.center()}
    .setting-font-family-text-wrapper {
      ${mixin.center()}
    }
    .setting-font-family-icon-wrapper {
      ${mixin.center()}
    }
  }
`
