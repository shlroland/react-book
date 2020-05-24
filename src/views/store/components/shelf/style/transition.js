export const fade = () => {
    return `
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
      transition: all 0.5s linear;
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.popup-slide-up-exit {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.popup-slide-up-exit-active {
      transition: all 0.5s linear;
      transform: translate3d(0, 100%, 0);
      opacity: 0;
    }
    `
  }