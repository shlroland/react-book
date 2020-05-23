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