import styled from 'styled-components'
import { px2vw } from '@/assets/styles'

export const BookShelfWrapper = styled.div`
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  font-size: 0;
  .shelf-title {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 110;
  }
  .book-shelf-list {
    position: absolute;
    top: ${px2vw(93.5)};
    left: 0;
    z-index: 100;
  }
  .book-shelf-empty {
    position: absolute;
    top: ${px2vw(42)};
    left: 0;
    z-index: 100;
  }
  .book-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    background: white;
  }
  .book-shelf-scroll-wrapper2 {
    position: absolute;
    top: ${px2vw(93.5)};
    left: 0;
    z-index: 101;
  }
`

