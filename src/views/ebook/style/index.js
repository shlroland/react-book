import styled, { css } from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import {
  slideDown,
  slideUp,
  popupSlideUp,
  fade,
  slideRight,
} from './transition'

export const EbookWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.Y}px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transition: ${props=> !(props.Y)? 'all 0.2s linear': ''};
`
export const EbookReaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
export const EbookTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 ${px2vw(8)} ${px2vw(8)} rgba(0, 0, 0, 0.15);
  font-size: ${px2vw(22)};
  ${slideDown()}
  .left {
    flex: 0 0 ${px2vw(37)};
    ${mixin.right()};
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 ${px2vw(37)};
      ${mixin.left()};
    }
  }
`
export const EbookMenuWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: ${(props) => {
    return props.hideBoxShadow ? 'none' : '0 -8px 8px rgba(0, 0, 0, 0.15)'
  }};
  font-size: ${px2vw(22)};
  ${slideUp()}
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
`
export const FontSettingWrapper = styled.div`
  position: absolute;
  bottom: ${px2vw(48)};
  left: 0;
  z-index: 190;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${px2vw(90)};
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${slideUp()}
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 ${px2vw(40)};
      ${mixin.center()}
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: 1px solid #acadaf;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: ${px2vw(7)};
          border-left: 1px solid #acadaf;
          .point {
            position: absolute;
            top: ${px2vw(-8)};
            left: ${px2vw(-10)};
            width: ${px2vw(20)};
            height: ${px2vw(20)};
            border-radius: 50%;
            box-shadow: 0 ${px2vw(4)} ${px2vw(4)} rgba(0, 0, 0, 0.15);
            background: #cecece;
            border: 1px solid #ccc;
            ${mixin.center()}
            .small-point {
              width: ${px2vw(5)};
              height: ${px2vw(5)};
              border-radius: 50%;
              background-color: #5d6268;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: ${px2vw(14)};
    ${mixin.center()}
    .setting-font-family-text-wrapper {
      ${mixin.center()}
    }
    .setting-font-family-icon-wrapper {
      ${mixin.center()}
    }
  }
`
export const FontFamilySettingWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 350;
  width: 100%;
  font-size: 0;
  box-shadow: 0 ${px2vw(-4)} ${px2vw(6)} rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${popupSlideUp()}
  .ebook-popup-title {
    position: relative;
    text-align: center;
    padding: ${px2vw(15)};
    border-bottom: ${px2vw(1)} solid #b8b9bb;
    box-sizing: border-box;
    ${mixin.center()}
    .ebook-popup-title-text {
      font-size: ${px2vw(14)};
      font-weight: bold;
    }
    .ebook-popup-title-icon {
      position: absolute;
      left: ${px2vw(15)};
      top: 0;
      height: 100%;
      ${mixin.center()}
      .icon-down2 {
        font-size: ${px2vw(16)};
        font-weight: bold;
      }
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: ${px2vw(15)};
      .ebook-popup-item-text {
        flex: 1;
        font-size: ${px2vw(14)};
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        .icon-check {
          font-size: ${px2vw(14)};
          font-weight: bold;
          color: #346cb9;
        }
      }
    }
  }
`
export const PopupListWrapper = styled.div`
  .ebook-popup-item {
    display: flex;
    padding: ${px2vw(15)};
    .ebook-popup-item-text {
      flex: 1;
      font-size: ${px2vw(14)};
      text-align: left;
      &.selected {
        color: #346cb9;
        font-weight: bold;
      }
    }
    .ebook-popup-item-check {
      flex: 1;
      text-align: right;
      .icon-check {
        font-size: ${px2vw(14)};
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
`
export const ThemeSettingWrapper = styled.div`
  position: absolute;
  bottom: ${px2vw(48)};
  left: 0;
  z-index: 190;
  width: 100%;
  height: ${px2vw(90)};
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${slideUp()}
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: ${px2vw(5)};
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: ${px2vw(1)} solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, 0.1);
          border: ${px2vw(2)} solid #5e6369;
        }
      }
      .text {
        flex: 0 0 ${px2vw(20)};
        font-size: ${px2vw(14)};
        ${mixin.center()}
      }
    }
  }
`
export const ThemeItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${px2vw(5)};
  box-sizing: border-box;
  .preview {
    flex: 1;
    border: ${px2vw(1)} solid #ccc;
    box-sizing: border-box;
    border: none;
    &.selected {
      box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, 0.1);
      border: ${px2vw(2)} solid #5e6369;
    }
  }
  .text {
    flex: 0 0 ${px2vw(20)};
    font-size: ${px2vw(14)};
    ${mixin.center()}
  }
`
export const ProgressSettingWrapper = styled.div`
   position: absolute;
    bottom: ${px2vw(48)};
    left: 0;
    z-index: 190;
    width: 100%;
    height: ${px2vw(90)};
    box-shadow: 0 ${px2vw(-8)} ${px2vw(8)} rgba(0, 0, 0, .15);
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
  ${slideUp()}
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: ${px2vw(40)};
        ${mixin.center()}
        font-size: ${px2vw(12)};
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        ${mixin.center()}
        padding: 0 ${px2vw(15)};
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: ${px2vw(2)};
          background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          background-size: ${(props) => props.progress}% 100%;
          margin: 0 ${px2vw(10)};
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: ${px2vw(20)};
            width: ${px2vw(20)};
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 ${px2vw(22)};
          font-size: ${px2vw(22)};
          ${mixin.center()}
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: ${px2vw(5)};
        width: 100%;
        font-size: ${px2vw(12)};
        text-align: center;
        padding: 0 ${px2vw(15)};
        box-sizing: border-box;
           ${mixin.center()}
        .progress-section-text {
          line-height: ${px2vw(15)};
          ${mixin.ellipsis()}
        }
        .progress-text {
        }
      }
    }
`
export const SlideSettingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 350;
  display: flex;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.slideTextColor};

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 351;
    background-color: ${(props) => props.theme.slideMaskColor};
    ${fade()}
  }
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    z-index: 352;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    ${slideRight()}
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 ${px2vw(48)};
        border-top: ${(props) => props.theme.contentBorder};
        .content-page-tab-item {
          flex: 1;
          font-size: ${px2vw(12)};
          ${mixin.center()}
          &.selected {
            color: ${(props) => props.theme.slideLightTextColor};
            font-weight: ${(props) => props.theme.slideFontWeight};
          }
        }
      }
    }
    .empty {
      width: 100%;
      height: 100%;
      ${mixin.center()};
      font-size: ${px2vw(16)};
      color: #333;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
`
export const SlideContentWrapper = styled.div`
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: ${px2vw(36)};
    margin: ${px2vw(20)} 0 ${px2vw(10)} 0;
    padding: 0 ${px2vw(15)};
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      border-radius: ${px2vw(3)};
      border: ${(props) => props.theme.contentBorder};
      ${mixin.center()};
      .slide-contents-search-icon {
        flex: 0 0 ${px2vw(28)};
        ${mixin.center()};
        .icon-search {
          font-size: ${px2vw(12)};
        }
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: ${px2vw(32)};
        font-size: ${px2vw(14)};
        background: transparent;
        border: none;
        color: ${(props) => props.theme.textColor};
        &:focus {
          outline: none;
        }
        &::-webkit-search-cancel-button{
          display: none;
        }
      }
      .content-search-text {
        color: ${(props) => props.theme.slideLightTextColor};
        font-weight: ${(props) => props.theme.slideFontWeight};
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 ${px2vw(50)};
      font-size: ${px2vw(14)};
      color: ${(props) => props.theme.slideLightTextColor};
      font-weight: ${(props) => props.theme.slideFontWeight};
      ${mixin.right()};
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: ${px2vw(90)};
    padding: ${px2vw(10)} ${px2vw(15)} ${px2vw(20)} ${px2vw(15)};
    box-sizing: border-box;
    border-bottom: ${(props) => props.theme.contentBorder};
    .slide-contents-book-img-wrapper {
      flex: 0 0 ${px2vw(45)};
      box-sizing: border-box;
      .slide-contents-book-img {
        width: ${px2vw(45)};
        height: ${px2vw(60)};
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      ${mixin.columnLeft()};
      .slide-contents-book-title {
        font-size: ${px2vw(14)};
        line-height: ${px2vw(16)};
        padding: 0 ${px2vw(10)};
        box-sizing: border-box;
        color: ${(props) => props.theme.textColor};
        ${mixin.left()};
        .slide-contents-book-title-text {
          ${mixin.ellipsis2(1)};
        }
      }
      .slide-contents-book-author {
        font-size: ${px2vw(12)};
        line-height: ${px2vw(14)};
        padding: 0 ${px2vw(10)};
        box-sizing: border-box;
        margin-top: ${px2vw(5)};
        ${mixin.left()};
        .slide-contents-book-author-text {
          ${mixin.ellipsis2(1)};
        }
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 ${px2vw(70)};
      color: ${(props) => props.theme.textColor};
      ${mixin.columnLeft()};
      .slide-contents-book-progress {
        .progress {
          font-size: ${px2vw(14)};
          line-height: ${px2vw(16)};
        }
        .progress-text {
          font-size: ${px2vw(12)};
          line-height: ${px2vw(14)};
          margin-left: ${px2vw(2)};
        }
      }
      .slide-contents-book-time {
        font-size: ${px2vw(12)};
        line-height: ${px2vw(14)};
        margin-top: ${px2vw(5)};
      }
    }
  }
  .slide-contents-list {
    padding: 0 ${px2vw(15)};
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: ${px2vw(20)} 0;
      box-sizing: border-box;
      border-bottom: ${(props) => props.theme.contentBorder};
      .slide-contents-item-label {
        flex: 1;
        font-size: ${px2vw(14)};
        line-height: ${px2vw(16)};
        ${mixin.ellipsis()};
        &.selected {
          color: ${(props) => props.theme.slideLightTextColor};
          font-weight: ${(props) => props.theme.slideFontWeight};
        }
      }
      .slide-contents-item-page {
        flex: 0 0 ${px2vw(30)};
        font-size: ${px2vw(10)};
        ${mixin.right()};
      }
    }
  }
  .slide-search-list {
    padding: 0 ${px2vw(15)};
    box-sizing: border-box;
    /* .slide-search-item {
      font-size: ${px2vw(14)};
      line-height: ${px2vw(16)};
      padding: ${px2vw(20)} 0;
      box-sizing: border-box;
      border-bottom: ${(props) => props.theme.contentBorder};
    } */
  }
`
export const SlideContentsItemWrapper = styled.div`
  display: flex;
  padding: ${px2vw(20)} 0;
  box-sizing: border-box;
  border-bottom: ${(props) => props.theme.contentBorder};
  .slide-contents-item-label {
    flex: 1;
    font-size: ${px2vw(14)};
    line-height: ${px2vw(16)};
    margin-left: ${({ level }) => {
      return `${px2vw(level * 8)}`
    }};
    ${mixin.ellipsis()};
    &.selected {
      color: ${(props) => props.theme.slideLightTextColor};
      font-weight: ${(props) => props.theme.slideFontWeight};
    }
  }
  .slide-contents-item-page {
    flex: 0 0 ${px2vw(30)};
    font-size: ${px2vw(10)};
    ${mixin.right()};
  }
`
export const SlideSearchItemWrapper = styled.div`
  font-size: ${px2vw(14)};
  line-height: ${px2vw(16)};
  padding: ${px2vw(20)} 0;
  box-sizing: border-box;
  border-bottom: ${(props) => props.theme.contentBorder};
  .content-search-text {
    color: ${(props) => props.theme.slideLightTextColor};
    font-weight: ${(props) => props.theme.slideFontWeight};
  }
`
