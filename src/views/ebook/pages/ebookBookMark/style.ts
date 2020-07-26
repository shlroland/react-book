import styled from 'styled-components'
import { px2vw, mixin, realPx } from '@/assets/styles'

export const EbookBookMarkWrapper = styled.div<{ top: number }>`
  position: absolute;
  top: ${(props) => px2vw(-props.top)};
  left: 0;
  z-index: 200;
  width: 100%;
  height: ${px2vw(35)};
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: ${px2vw(45)};
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: ${px2vw(14)};
      color: white;
      transition: all 0.2s linear;
      ${mixin.center()};
      transform: ${(props) => {
        if (props.top >= realPx(35) && props.top < realPx(55)) {
          return 'rotate(0deg)'
        } else if (props.top > realPx(55)) {
          return 'rotate(180deg)'
        }
      }};
    }
    .ebook-bookmark-text {
      font-size: ${px2vw(14)};
      color: white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: ${px2vw(10)};
    &.beFixed {
      position: fixed;
      right: 0px;
      top: 0px;
      z-index: 210;
    }
  }
`
