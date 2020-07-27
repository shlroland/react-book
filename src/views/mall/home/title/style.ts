import styled from 'styled-components'
import { px2vw,mixin } from '@/assets/styles'

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