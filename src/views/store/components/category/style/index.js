import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import { fade, popupSlideUp } from './transition'
import { mixinTitle } from '@/assets/style/home'

export const BookCategoryWrapper = styled.div`
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
  .book-shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
  }
  .book-shelf-empty {
    position: absolute;
    top: ${px2vw(42)};
    left: 0;
    z-index: 100;
  }
  .book-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    background: white;
  }
  .book-shelf-scroll-wrapper2 {
    position: absolute;
    top: ${px2vw(93.5)};
    left: 0;
    z-index: 101;
  }
  .shelf-empty-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      ${mixin.center()}
      font-size:  ${px2vw(93.5)};
      color: #333;
    }
`
export const CategoryTitleWrapper = styled.div`
  position: relative;
  z-index: 120;
  width: 100%;
  height: ${px2vw(42)};
  background: white;
  box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: ${px2vw(42)};
    ${mixin.columnCenter()};
    .title-text {
      font-size: ${px2vw(16)};
      line-height: ${px2vw(20)};
      font-weight: bold;
      color: #333;
    }
    .sub-title-text {
      font-size: ${px2vw(10)};
      color: #333;
    }
  }
  .btn-text-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 115;
    padding-right: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    ${mixin.center()};
    .btn-text {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
  .btn-clear-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 115;
    padding-left: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    ${mixin.center()};
    .btn-clear {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
  .btn-back-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 115;
    padding-left: ${px2vw(16.5)};
    box-sizing: border-box;
    height: 100%;
    font-size: ${px2vw(20)};
    color: #666;
    ${mixin.center()};
    &:active {
      color: rgba(102, 102, 102, 0.5);
    }
    .btn-text {
      font-size: ${px2vw(14)};
      color: #666;
    }
  }
`
export const CategoryWrapper = styled.div`
  width: 100%;
  overflow: auto;
  font-size: 0;
  .book-shelf-content-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 ${px2vw(15)};
    box-sizing: border-box;
    .book-shelf-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: ${px2vw(15)};
      box-sizing: border-box;
      &.item-exit {
        opacity: 1;
      }
      &.list-exit-active {
        transition: all 5s linear;
        opacity: 0;
      }
      .book-img-wrapper {
        width: 100%;
        ${mixin.shelfImgHeight};
        box-shadow: ${px2vw(2)} ${px2vw(2)} ${px2vw(6)} ${px2vw(2)}
          rgba(200, 200, 200, 0.3);
        ${mixin.center()};
        border: ${px2vw(1)} solid #eee;
        box-sizing: border-box;
        &.add-book {
          box-shadow: none;
          border: ${px2vw(1)} solid #ccc;
          box-sizing: border-box;
        }
        &.category-book {
          border: ${px2vw(1)} solid #eee;
          box-sizing: border-box;
        }
        .book-img {
          width: 100%;
          height: 100%;
        }
        .icon-add {
          font-size: ${px2vw(40)};
          color: #ccc;
        }
      }
      .book-title-wrapper {
        .book-title {
          margin-top: ${px2vw(10)};
        }
      }
    }
    ${mixinTitle()}
  }
  .book-shelf-statistics {
    margin: ${px2vw(30)} 0 ${px2vw(20)} 0;
    text-align: center;
    font-size: ${px2vw(12)};
    color: #999;
  }
  .book-shelf-label-list-wrapper {
    width: 100%;
    .book-shelf-list-wrapper {
      position: relative;
      width: 100%;
      .book-shelf-label-item {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 120;
        width: 100%;
        height: ${px2vw(42)};
        border-top: ${px2vw(1)} solid #eee;
        border-bottom: none;
        box-sizing: border-box;
        background: white;
        &.is-fixed {
          position: fixed;
          top: ${px2vw(93)};
          left: 0;
          border-bottom: ${px2vw(1)} solid #eee;
        }
        ${mixin.left()};
        .book-shelf-label-text {
          font-size: ${px2vw(14)};
          color: #666;
          margin: 0 ${px2vw(15)};
        }
      }
      .book-shelf-item-wrapper {
        position: relative;
        z-index: 110;
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        padding: ${px2vw(42)} ${px2vw(15)} 0 ${px2vw(15)};
        box-sizing: border-box;
        .book-shelf-item {
          flex: 0 0 33.33%;
          width: 33.33%;
          padding: ${px2vw(15)};
          box-sizing: border-box;
          &.list-move {
            transition: transform 0.5s;
          }
          &.list-leave-active {
            display: none;
          }
          .book-img-wrapper {
            width: 100%;
            ${mixin.shelfImgHeight};
            box-shadow: ${px2vw(2)} ${px2vw(2)} ${px2vw(6)} ${px2vw(2)}
              rgba(200, 200, 200, 0.3);
            ${mixin.center()};
            border: ${px2vw(1)} solid #eee;
            box-sizing: border-box;
            &.add-book {
              box-shadow: none;
              border: ${px2vw(1)} solid #ccc;
              box-sizing: border-box;
            }
            &.category-book {
              border: ${px2vw(1)} solid #eee;
              box-sizing: border-box;
            }
            .book-img {
              width: 100%;
              height: 100%;
            }
            .icon-add {
              font-size: ${px2vw(40)};
              color: #ccc;
            }
          }
          .book-title-wrapper {
            .book-title {
              margin-top: ${px2vw(10)};
            }
            ${mixinTitle()}
          }
        }
      }
    }
  }
`
export const CategoryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .book-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .icon-selected {
    position: absolute;
    bottom: ${px2vw(2)};
    right: ${px2vw(2)};
    font-size: ${px2vw(18)};
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: ${mixin.variableColor.$colorBlue};
    }
  }
  .private-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-width: ${px2vw(15)};
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3);
  }
  .private-icon-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${px2vw(30)};
    height: ${px2vw(30)};
    padding-bottom: ${px2vw(5)};
    padding-left: ${px2vw(3)};
    ${mixin.leftBottom()};
    .icon-private {
      font-size: ${px2vw(12)};
      color: white;
    }
  }
`
export const CategoryFooterWrapper = styled.div`
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
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: white;
    ${popupSlideUp()}
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
  ${fade()}
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
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .modal-bg {
    width: 100%;
    height: 100%;
  }
  .modal-box {
    width: ${px2vw(225)};
    height: ${px2vw(115)};
    background-color: #fff;
    ${mixin.absCenter()}
    ${fade()}
    .modal-content {
      width: 100%;
      height: 65%;
      border-bottom: 1px solid #eee;
      color: #999;
      box-sizing: border-box;
      padding: 10px;
      font-size:16px;
      line-height:18px;
      ${mixin.center()}
    }
    .modal-bottom {
      height: 35%;
      display: flex;
      align-items: center;
      .modal-bottom-left {
        width: 50%;
        ${mixin.center()}
      }
      .modal-bottom-right {
        width: 50%;
        ${mixin.center()};
        color: ${mixin.variableColor.$colorPink};
      }
      .modal-bottom-gap {
        height: 80%;
        width: 1px;
        background-color: #eee;
      }
    }
  }
`
