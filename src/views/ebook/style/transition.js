import { px2vw } from '@assets/style'

export const slideUp = () => {
  return `
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
}

export const slideDown = () => {
  return `
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
}

export const popupSlideUp = () => {
  return `
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
}
