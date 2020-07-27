import styled from 'styled-components'
import { px2vw, mixinTitle } from '@/assets/styles'

export const GuessYouLikeWrapper = styled.div`
  .guess-you-like-list {
    width: 100%;
    padding: 0 ${px2vw(10)};
    box-sizing: border-box;
    .guess-you-like-item {
      display: flex;
      margin-top: ${px2vw(15)};
      &:first-child {
        margin-top: ${px2vw(5)};
      }
      .img-wrapper {
        flex: 0 0 20%;
        padding: ${px2vw(10)} ${px2vw(10)} ${px2vw(10)} 0;
        box-sizing: border-box;
        .img {
          width: 100%;
        }
      }
      .content-wrapper {
        flex: 1;
        padding: ${px2vw(10)} 0;
        box-sizing: border-box;
        .author {
          margin-top: ${px2vw(15)};
        }
        .result {
          margin-top: ${px2vw(5)};
        }
        ${mixinTitle()}
      }
    }
  }
`
