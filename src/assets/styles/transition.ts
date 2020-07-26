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

export const popupSlideUp = () => css`
  &.popup-slide-up-enter,
  &.popup-slide-up-appear {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  &.popup-slide-up-enter-active,
  &.popup-slide-up-appear-active {
    transition: all 0.3s linear;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.popup-slide-up-exit {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.popup-slide-up-exit-active {
    transition: all 0.3s linear;
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
`

export const fade = () => css`
  &.fade-enter,
  &.fade-appear {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-appear-active {
    transition: all 0.5s linear;
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    transition: all 0.5s linear;
    opacity: 0;
  }
`
export const slideRight = () => css`
  &.slide-right-enter,
  &.slide-right-appear {
    transform: translate3d(-100%, 0, 0);
  }
  &.slide-right-enter-active,
  &.slide-right-appear-active {
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
  }
  &.slide-right-exit {
    transform: translate3d(0, 0, 0);
  }
  &.slide-right-exit-active {
    transition: transform 0.5s;
    transform: translate3d(-100%, 0, 0);
  }
`
export const title = () => css`
  &.title-enter {
    transform: translate3d(0, -${px2vw(10)}, 0);
    opacity: 0;
  }
  &.title-enter-active {
    transition: all 0.25s linear;
  }
  &.title-enter-done {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.title-exit {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.title-exit-active {
    transition: all 0.25s linear;
    transform: translate3d(0, ${px2vw(10)}, 0);
    opacity: 0;
  }
`

export const hotSearch = () => css`
  &.title-enter {
    transform: translate3d(0, -${px2vw(50)}, 0);
    opacity: 0;
  }
  &.title-enter-active {
    transition: all 0.5s linear;
  }
  &.title-enter-done {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.title-exit {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.title-exit-active {
    transition: all 0.5s linear;
    transform: translate3d(0, ${px2vw(50)}, 0);
    opacity: 0;
  }
`
