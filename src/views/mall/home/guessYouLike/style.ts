import styled from 'styled-components'
import { px2vw, mixinTitle,mixin } from '@/assets/styles'

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

export const TitleWrapper = styled.div`
  width: 100%;
  padding: ${px2vw(15)} ${px2vw(10)};
  box-sizing: border-box;
  ${mixin.top()}
  .label {
    flex: 1;
    font-size: ${px2vw(18)};
    color: #333;
    font-weight: bold;
  }
  .btn {
    font-size: ${px2vw(14)};
    color: rgba(64, 158, 255, 1);
    &.touch {
      color: rgba(64, 158, 255, 0.5);
    }
  }
`