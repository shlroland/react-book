import styled from 'styled-components'
import { px2vw, mixinTitle, mixin } from '@/assets/styles'

export const FeaturedWrapper = styled.div`
  margin-top: ${px2vw(20)};
  .featured-list {
    width: 100%;
    padding: 0 ${px2vw(10)};
    box-sizing: border-box;
    .featured-item-wrapper {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;
      .featured-item {
        flex: 0 0 50%;
        width: 50%;
        padding: ${px2vw(5)} 0;
        ${mixin.top()};
        .img-wrapper {
          flex: 0 0 30%;
          width: 30%;
          .img {
            width: 100%;
          }
        }
        .content-wrapper {
          flex: 1;
          width: ${px2vw(117.5)};
          padding: 0 ${px2vw(5)};
          box-sizing: border-box;
          .author {
            margin-top: ${px2vw(15)};
          }
          .category {
            margin-top: ${px2vw(5)};
          }
          ${mixinTitle()}
        }
      }
    }
  }
`
