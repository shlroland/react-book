import styled from 'styled-components'
import { px2vw, mixin, mixinTitle } from '@/assets/styles'

export const ShelfWrapper = styled.div`
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
