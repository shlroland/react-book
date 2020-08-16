import styled from 'styled-components'
import { px2vw, mixin,transition } from '@/assets/styles'

export const ShelfGroupDialogWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 120;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  font-size: ${px2vw(16)};
  color: #333;
  ${mixin.center()}
  ${transition.fade()}
  .shelf-group-dialog-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 60%;
    max-height: 80%;
    background: white;
    border-radius: ${px2vw(10)};
    .dialog-list {
      width: 100%;
      padding: 0 ${px2vw(20)};
      box-sizing: border-box;
      ${mixin.scroll()}
      .dialog-title-wrapper {
        font-size: ${px2vw(22)};
        font-weight: bold;
        text-align: center;
        padding: ${px2vw(30)} 0 ${px2vw(20)} 0;
      }
      .dialog-list-wrapper {
        font-size: ${px2vw(14)};
        .dialog-list-item {
          display: flex;
          padding: ${px2vw(15)} 0;
          box-sizing: border-box;
          color: #666;
          &.is-add {
            color: ${mixin.variableColor.$colorBlue};
            &:active {
              color: ${mixin.variableColor.$colorBlueTransparent};
            }
          }
          &:active {
            color: rgba(102, 102, 102, 0.5);
          }
          .dialog-list-item-text {
            flex: 1;
          }
          .dialog-list-icon-wrapper {
            flex: 0 0 ${px2vw(30)};
            color: ${mixin.variableColor.$colorBlue};
            ${mixin.right()};
          }
        }
      }
    }
    .dialog-btn-wrapper {
      display: flex;
      width: 100%;
      background: ${mixin.variableColor.$colorBlue};
      font-size: ${px2vw(14)};
      font-weight: bold;
      color: white;
      text-align: center;
      padding: ${px2vw(15)} 0;
      box-sizing: border-box;
      border-radius: 0 0 ${px2vw(10)} ${px2vw(10)};
      .dialog-btn {
        flex: 1;
        &.is-empty {
          color: rgba(255, 255, 255, 0.5);
        }
        &:active {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .dialog-input-title-wrapper {
      font-size: ${px2vw(10)};
      margin-top: ${px2vw(20)};
    }
    .dialog-input-wrapper {
      width: 100%;
      padding: 0 0 ${px2vw(30)} 0;
      box-sizing: border-box;
      .dialog-input-inner-wrapper {
        display: flex;
        width: 100%;
        padding: ${px2vw(10)} 0;
        box-sizing: border-box;
        border-bottom: ${px2vw(1)} solid #eee;
        font-size: ${px2vw(14)};
        color: #666;
        .dialog-input {
          flex: 1;
          border: none;
          &:focus {
            outline: none;
          }
        }
        .dialog-input-clear-wrapper {
          flex: 0 0 ${px2vw(30)};
          color: #ccc;
          ${mixin.center()};
          &:active {
            color: #999;
          }
        }
      }
    }
  }
`
