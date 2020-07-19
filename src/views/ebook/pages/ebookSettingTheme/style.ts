import styled from "styled-components"
import { px2vw, transition, mixin } from "@/assets/styles"

export const ThemeSettingWrapper = styled.div`
  position: absolute;
  bottom: ${px2vw(48)};
  left: 0;
  z-index: 190;
  width: 100%;
  height: ${px2vw(90)};
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${transition.slideUp()}
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: ${px2vw(5)};
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: ${px2vw(1)} solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, 0.1);
          border: ${px2vw(2)} solid #5e6369;
        }
      }
      .text {
        flex: 0 0 ${px2vw(20)};
        font-size: ${px2vw(14)};
        ${mixin.center()}
      }
    }
  }
`
export const ThemeItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${px2vw(5)};
  box-sizing: border-box;
  .preview {
    flex: 1;
    border: ${px2vw(1)} solid #ccc;
    box-sizing: border-box;
    border: none;
    &.selected {
      box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, 0.1);
      border: ${px2vw(2)} solid #5e6369;
    }
  }
  .text {
    flex: 0 0 ${px2vw(20)};
    font-size: ${px2vw(14)};
    ${mixin.center()}
  }
`
