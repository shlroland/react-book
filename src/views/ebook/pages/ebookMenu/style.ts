import styled from "styled-components"
import { px2vw,transition,mixin } from "@/assets/styles"

const EbookMenuWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: ${px2vw(48)};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  
  font-size: ${px2vw(22)};
  ${transition.slideUp()}
  .icon-wrapper {
    flex: 1;
    ${mixin.center()}
    .icon-progress {
      font-size: ${px2vw(24)};
    }
    .icon-A {
      font-size: ${px2vw(20)};
    }
  }
`

export default EbookMenuWrapper