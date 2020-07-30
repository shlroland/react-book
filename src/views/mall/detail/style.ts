import styled from 'styled-components'
import { px2vw, mixin } from '@/assets/styles'

export const BookDetailWrapper = styled.div`
width: 100%;
background: white;
.content-wrapper {
  width: 100%;
  .book-detail-content-wrapper {
    width: 100%;
    border-bottom: ${px2vw(1)} solid #eee;
    box-sizing: border-box;
    .book-detail-content-title {
      font-size: ${px2vw(20)};
      font-weight: bold;
      padding: ${px2vw(20)} ${px2vw(15)} ${px2vw(10)} ${px2vw(15)};
      box-sizing: border-box;
    }
    .book-detail-content-list-wrapper {
      padding: ${px2vw(10)} ${px2vw(15)};
      box-sizing: border-box;
      .loading-text-wrapper {
        width: 100%;
        .loading-text {
          font-size: ${px2vw(14)};
          color: #666;
        }
      }
      .book-detail-content-row {
        display: flex;
        box-sizing: border-box;
        margin-bottom: ${px2vw(10)};
        .book-detail-content-label {
          flex: 0 0 ${px2vw(70)};
          font-size: ${px2vw(14)};
          color: #666;
        }
        .book-detail-content-text {
          flex: 1;
          font-size: ${px2vw(14)};
          color: #333;
        }
      }
      #preview {
      }
      .book-detail-content-item-wrapper {
        .book-detail-content-item {
          padding: ${px2vw(15)} 0;
          font-size: ${px2vw(14)};
          line-height: ${px2vw(16)};
          color: #666;
          border-bottom: ${px2vw(1)} solid #eee;
          &:last-child {
            border-bottom: none;
          }
          .book-detail-content-navigation-text {
            width: 100%;
            ${mixin.ellipsis()};
            &.is-sub {
              color: #666;
            }
          }
        }
      }
    }
  }
  .audio-wrapper {
    width: 100%;
    padding: ${px2vw(15)};
    box-sizing: border-box;
    #audio {
      width: 100%;
    }
  }
}
.bottom-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: ${px2vw(52)};
  box-shadow: 0 ${px2vw(-2)} ${px2vw(2)} rgba(0, 0, 0, 0.1);
  background-color: #fff;
  .bottom-btn {
    flex: 1;
    color: ${mixin.variableColor['$colorBlue']};
    font-weight: bold;
    font-size: ${px2vw(14)};
    ${mixin.center()};
    &:active {
      color: ${mixin.variableColor['$colorBlueTransparent']};
    }
    .icon-check {
      margin-right: ${px2vw(5)};
    }
  }
  &.hide-shadow {
    box-shadow: none;
  }
}
`

export const BookInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${px2vw(10)} 0;
  border-bottom: ${px2vw(1)} solid #eee;
  box-sizing: border-box;
  .cover-title-left-wrapper {
    flex: 0 0 ${px2vw(103)};
    padding: ${px2vw(10)} 0 ${px2vw(10)} ${px2vw(15)};
    box-sizing: border-box;
    ${mixin.top()};
    .cover-img {
      width: ${px2vw(103)};
      height: ${px2vw(146)};
    }
  }
  .cover-title-right-wrapper {
    flex: 1;
    padding: ${px2vw(10)} ${px2vw(15)};
    box-sizing: border-box;
    .detail-cover-title-wrapper {
      .cover-title-text {
        font-size: ${px2vw(24)};
        line-height: ${px2vw(26)};
        font-weight: bold;
        color: #333;
      }
    }
    .cover-author-wrapper {
      margin-top: ${px2vw(10)};
      .cover-author-text {
        font-size: ${px2vw(14)};
        line-height: ${px2vw(16)};
        color: ${mixin.variableColor['$colorBlue']};
      }
    }
    .detail-cover-description-wrapper {
      margin-top: ${px2vw(10)};
      .detail-cover-description-text {
        font-size: ${px2vw(14)};
        line-height: ${px2vw(16)};
        color: #666;
        word-break: keep-all;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
      }
    }
  }
`

export const DetailTitleWrapper = styled.div`
  .detail-title-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: ${px2vw(42)};
    box-shadow: 0 ${px2vw(2)} ${px2vw(2)} 0 rgba(0, 0, 0, 0.1);
    font-size: ${px2vw(20)};
    color: #666;
    &.hide-shadow {
      box-shadow: none;
    }
    .title-left-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-left: ${px2vw(15)};
      ${mixin.left()};
    }
    .title-right-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-right: ${px2vw(15)};
      ${mixin.right()};
    }
    .title-text {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: ${px2vw(42)};
      font-size: ${px2vw(16)};
      color: #333;
      ${mixin.center()};
    }
  }
`
