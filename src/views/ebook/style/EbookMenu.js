import styled from 'styled-components'
import { px2vw,mixin } from '@assets/style'

export const EbookMenuWrapper = styled.div`
.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: ${px2vw(48)};
    background-color: rgba(242, 243, 244,0.9);
    box-shadow: 0 ${px2vw(-8)} ${px2vw(8)} rgba(0, 0, 0, .15);
    font-size: ${px2vw(22)};
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
  }
`