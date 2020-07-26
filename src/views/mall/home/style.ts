import styled from 'styled-components'
import { px2vw } from '@/assets/styles'

export const BookHomeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: ${px2vw(16)};
  color: #666;
  .book-list-wrapper {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .banner-wrapper {
      width: 100%;
      padding: ${px2vw(10)};
      box-sizing: border-box;
      .banner {
        width: 100%;
        height: ${px2vw(150)};
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend {
      margin-top: ${px2vw(20)};
    }
    .featured {
      margin-top: ${px2vw(20)};
    }
    .category-list-wrapper {
      margin-top: ${px2vw(20)};
    }
    .category {
      margin-top: ${px2vw(20)};
    }
  }
`
