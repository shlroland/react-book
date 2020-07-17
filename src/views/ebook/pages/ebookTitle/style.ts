import styled from 'styled-components'
import {px2vw, mixin} from '@/assets/styles'

const EbookTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 ${px2vw(8)} ${px2vw(8)} rgba(0, 0, 0, 0.15);
  font-size: ${px2vw(22)};
  .left {
    flex: 0 0 ${px2vw(37)};
    ${mixin.right()};
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 ${px2vw(37)};
      ${mixin.left()};
    }
  }
`

export default EbookTitleWrapper