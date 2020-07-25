import styled from 'styled-components'
import { px2vw, transition, mixin } from '@/assets/styles'

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
    ${transition.fade()}
  }
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    z-index: 352;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    ${transition.slideRight()}
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
export const SlideContentsItemWrapper = styled.div<{ level: number }>`
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
