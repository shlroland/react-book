import styled from 'styled-components'
import { px2vw,mixin,transition } from '@/assets/styles'

export const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
    ${transition.fade()}
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: white;
    ${transition.popupSlideUp()}
    .popup-title {
      width: 100%;
      height: ${px2vw(44)};
      border-bottom: ${px2vw(1)} solid #eee;
      font-size: ${px2vw(12)};
      line-height: ${px2vw(14)};
      padding: ${px2vw(15)};
      box-sizing: border-box;
      text-align: center;
      color: #999;
      ${mixin.center()};
    }
    .popup-confirm-btn {
      width: 100%;
      height: ${px2vw(60)};
      border-bottom: ${px2vw(1)} solid #eee;
      font-size: ${px2vw(16)};
      color: #666;
      font-weight: bold;
      ${mixin.center()};
      &.is-remove {
        color: ${mixin.variableColor.$colorPink};
      }
    }
    .popup-cancel-btn {
      width: 100%;
      height: ${px2vw(60)};
      font-size: ${px2vw(16)};
      color: #666;
      font-weight: bold;
      ${mixin.center()};
    }
  }
`
