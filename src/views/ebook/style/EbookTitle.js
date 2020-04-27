import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'

export const EbookTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: rgba(242, 243, 244, 0.9);
  box-shadow: 0 ${px2vw(8)} ${px2vw(8)} rgba(0, 0, 0, 0.15);
  font-size: ${px2vw(22)};
  &.slide-down-enter,
  &.slide-down-appear {
    transform: translate3d(0, -100%, 0);
  }
  &.slide-down-enter-active,
  &.slide-down-appear-active {
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
  }
  &.slide-down-exit {
    transform: translate3d(0, 0, 0);
  }
  &.slide-down-exit-active {
    transition: transform 0.5s;
    transform: translate3d(0, -100%, 0);
  }
  .left {
    flex: 0 0 ${px2vw(37)};
    ${mixin.right()};
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 ${px2vw(37)};
      ${mixin.left()};
    }
  }
`