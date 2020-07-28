import styled from 'styled-components'
import { px2vw, mixinTitle, mixin } from '@/assets/styles'


export const CategoryBookWrapper = styled.div`
  .category-book-list {
    width: 100%;
    ${mixin.top()};
    padding: 0 ${px2vw(5)};
    box-sizing: border-box;
    .category-book-item {
      flex: 0 0 25%;
      width: 25%;
      padding: 0 ${px2vw(5)};
      box-sizing: border-box;
      .img-wrapper {
        ${mixin.center()};
        .img {
          width: 100%;
        }
      }
      .content-wrapper {
        width: 100%;
        margin-top: ${px2vw(10)};
        .num {
          margin-top: ${px2vw(5)};
        }
        ${mixinTitle()}
      }
    }
  }
`
