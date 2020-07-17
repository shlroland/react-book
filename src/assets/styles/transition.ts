import { css } from 'styled-components'
import { px2vw } from './function'

export const slideUp = () => css`
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
`

export const slideDown = () => css`
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
`
