import styled from 'styled-components'
import { px2vw, mixinTitle,mixin } from '@/assets/styles'

export const RecommendWrapper = styled.div`
margin-top: ${px2vw(20)};
    .recommend-list {
      width: 100%;
      ${mixin.top()}
      padding: 0 ${px2vw(5)};
      box-sizing: border-box;
      .recommend-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 ${px2vw(5)};
        box-sizing: border-box;
        .img-wrapper {
          ${mixin.center()}
          .img {
            width: 80%;
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: ${px2vw(10)};
          ${mixin.columnCenter()}
          .title {
            text-align: center;
          }
          .num {
            margin-top: ${px2vw(5)};
          }
        ${mixinTitle()}
        }
      }
    }
`
