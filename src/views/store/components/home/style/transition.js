import { px2vw } from '@assets/style'

export const title = () => {
  return `
    &.title-enter{
        transform: translate3d(0, -${px2vw(10)}, 0);
        opacity: 0;
    }
    &.title-enter-active{
      transition: all 0.25s linear;
    }
    &.title-enter-done{
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
}
