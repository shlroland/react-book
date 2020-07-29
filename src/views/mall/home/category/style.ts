import styled from 'styled-components'
import { px2vw, mixinTitle, mixin } from '@/assets/styles'

export const CategoryWrapper = styled.div`
  margin-top: ${px2vw(20)};
  .category-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    .category-item-wrapper {
      flex: 0 0 50%;
      width: 50%;
      padding: 0 ${px2vw(5)} ${px2vw(10)} ${px2vw(5)};
      box-sizing: border-box;
      &:nth-child(odd) {
        padding-left: ${px2vw(10)};
      }
      &:nth-child(even) {
        padding-right: ${px2vw(10)};
      }
      .category-item {
        display: flex;
        width: 100%;
        background: #eee;
        .img-wrapper {
          flex: 0 0 50%;
          width: 50%;
          padding: ${px2vw(20)} ${px2vw(10)};
          box-sizing: border-box;
          .img-group {
            position: relative;
            width: 100%;
            height: ${px2vw(60)};
            ${mixin.left()};
            .img {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 100;
              width: ${px2vw(45)};
              height: ${px2vw(60)};
            }
            .img2 {
              position: absolute;
              left: ${px2vw(30)};
              top: ${px2vw(7.5)};
              z-index: 99;
              width: ${px2vw(30)};
              height: ${px2vw(45)};
            }
          }
        }
        .content-wrapper {
          flex: 0 0 50%;
          width: 50%;
          ${mixin.columnCenter()};
          .title {
            text-align: center;
          }
          .num {
            text-align: center;
            margin-top: ${px2vw(5)};
          }
          ${mixinTitle()}
        }
      }
    }
  }
`
