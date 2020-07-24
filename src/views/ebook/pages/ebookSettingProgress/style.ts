import styled from 'styled-components'
import { px2vw, transition, mixin } from '@/assets/styles'
// const ProgressSettingWrapper = styled.div<{progress:number}>`
const ProgressSettingWrapper = styled.div<{ progress: number }>`
   position: absolute;
    bottom: ${px2vw(48)};
    left: 0;
    z-index: 190;
    width: 100%;
    height: ${px2vw(90)};
    box-shadow: 0 ${px2vw(-8)} ${px2vw(8)} rgba(0, 0, 0, .15);
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
  ${transition.slideUp()}
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: ${px2vw(40)};
        font-size: ${px2vw(12)};
        ${mixin.center()}
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        ${mixin.center()}
        padding: 0 ${px2vw(15)};
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: ${px2vw(2)};
          background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          background-size: ${(props) => props.progress}% 100%;
          margin: 0 ${px2vw(10)};
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: ${px2vw(20)};
            width: ${px2vw(20)};
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 ${px2vw(4)} ${px2vw(6)} 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 ${px2vw(22)};
          font-size: ${px2vw(22)};
          ${mixin.center()}
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: ${px2vw(5)};
        width: 100%;
        font-size: ${px2vw(12)};
        text-align: center;
        padding: 0 ${px2vw(15)};
        box-sizing: border-box;
           ${mixin.center()}
        .progress-section-text {
          line-height: ${px2vw(15)};
          ${mixin.ellipsis()}
        }
        .progress-text {
        }
      }
    }
`
export default ProgressSettingWrapper
