import styled from "styled-components"
import { px2vw, transition, mixin } from "@/assets/styles"

export const FontSettingWrapper = styled.div`
  position: absolute;
  bottom: ${px2vw(48)};
  left: 0;
  z-index: 190;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${px2vw(90)};
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${transition.slideUp()}
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 ${px2vw(40)};
      ${mixin.center()}
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: 1px solid #acadaf;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: ${px2vw(7)};
          border-left: 1px solid #acadaf;
          .point {
            position: absolute;
            top: ${px2vw(-8)};
            left: ${px2vw(-10)};
            width: ${px2vw(20)};
            height: ${px2vw(20)};
            border-radius: 50%;
            box-shadow: 0 ${px2vw(4)} ${px2vw(4)} rgba(0, 0, 0, 0.15);
            background: #cecece;
            border: 1px solid #ccc;
            ${mixin.center()}
            .small-point {
              width: ${px2vw(5)};
              height: ${px2vw(5)};
              border-radius: 50%;
              background-color: #5d6268;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: ${px2vw(14)};
    ${mixin.center()}
    .setting-font-family-text-wrapper {
      ${mixin.center()}
    }
    .setting-font-family-icon-wrapper {
      ${mixin.center()}
    }
  }
`

export const FontFamilySettingWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 350;
  width: 100%;
  font-size: 0;
  box-shadow: 0 ${px2vw(-4)} ${px2vw(6)} rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  ${transition.popupSlideUp()}
  .ebook-popup-title {
    position: relative;
    text-align: center;
    padding: ${px2vw(15)};
    border-bottom: ${px2vw(1)} solid #b8b9bb;
    box-sizing: border-box;
    ${mixin.center()}
    .ebook-popup-title-text {
      font-size: ${px2vw(14)};
      font-weight: bold;
    }
    .ebook-popup-title-icon {
      position: absolute;
      left: ${px2vw(15)};
      top: 0;
      height: 100%;
      ${mixin.center()}
      .icon-down2 {
        font-size: ${px2vw(16)};
        font-weight: bold;
      }
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: ${px2vw(15)};
      .ebook-popup-item-text {
        flex: 1;
        font-size: ${px2vw(14)};
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        .icon-check {
          font-size: ${px2vw(14)};
          font-weight: bold;
          color: #346cb9;
        }
      }
    }
  }
`

export const PopupListWrapper = styled.div`
  .ebook-popup-item {
    display: flex;
    padding: ${px2vw(15)};
    .ebook-popup-item-text {
      flex: 1;
      font-size: ${px2vw(14)};
      text-align: left;
      &.selected {
        color: #346cb9;
        font-weight: bold;
      }
    }
    .ebook-popup-item-check {
      flex: 1;
      text-align: right;
      .icon-check {
        font-size: ${px2vw(14)};
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
`