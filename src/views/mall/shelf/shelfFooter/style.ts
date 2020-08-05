import styled from 'styled-components'
import { px2vw, mixin } from '@/assets/styles'

export const ShelfFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background: white;
  box-shadow: 0 ${px2vw(-2)} ${px2vw(4)} 0 rgba(0, 0, 0, 0.1);
  .book-shelf-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;
    .book-shelf-tab {
      width: 100%;
      height: 100%;
      ${mixin.columnCenter()};
      .tab-icon {
        font-size: ${px2vw(20)};
        color: #666;
        opacity: 0.5;
        &.icon-shelf {
          color: ${mixin.variableColor.$colorPink};
        }
        &.icon-download {
          font-size: ${px2vw(22)};
        }
        &.is-selected {
          opacity: 1;
        }
      }
      .tab-text {
        margin-top: ${px2vw(5)};
        font-size: ${px2vw(12)};
        color: #666;
        opacity: 0.5;
        &.remove-text {
          color: ${mixin.variableColor.$colorPink};
        }
        &.is-selected {
          opacity: 1;
        }
      }
    }
  }
`
