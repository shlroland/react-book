import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'

export const EbookMenuWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: rgba(242, 243, 244, 0.9);
  /* box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15); */
  box-shadow: ${(props) => {
    return props.hideBoxShadow ? 'none' : '0 -8px 8px rgba(0, 0, 0, 0.15)'
  }};
  font-size: ${px2vw(22)};
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
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    ${mixin.center()}
    .icon-progress {
      font-size: ${px2vw(24)};
    }
    .icon-A {
      font-size: ${px2vw(20)};
    }
  }
`
