import { css } from 'styled-components'
import { px2vw, mixin } from '@assets/style'

// const $textLarge = px2vw(18)
const $textBig = px2vw(16)
const $textMedium = px2vw(14)
const $textSmall = px2vw(12)
const $textTiny = px2vw(10)
// const $textLargeLh = px2vw(20)
const $textBigLh = px2vw(18)
const $textMediumLh = px2vw(16)
const $textSmallLh = px2vw(15)
const $textTinyLh = px2vw(12)
// const $textBigMaxHeight3 = px2vw(54)
// const $textMediumMaxHeight3 = px2vw(48)
// const $textSmallMaxHeight3 = px2vw(42)
const $textBigMaxHeight2 = px2vw(36)
const $textMediumMaxHeight2 = px2vw(32)
const $textMediumMaxHeight = px2vw(16)
const $textSmallMaxHeight2 = px2vw(30)
const $textSmallMaxHeight = px2vw(15)
const $textTinyMaxHeight = px2vw(12)

export const mixinTitle = () => css`
  .title-big {
    line-height: ${$textBigLh};
    font-size: ${$textBig};
    max-height: ${$textBigMaxHeight2};
    color: #444;
    font-weight: bold;
    ${mixin.ellipsis2(3)};
  }
  .title-medium {
    font-size: ${$textMedium};
    line-height: ${$textMediumLh};
    max-height: ${$textMediumMaxHeight2};
    color: #444;
    font-weight: bold;
    ${mixin.ellipsis2(3)};
  }
  .title-small {
    font-size: ${$textSmall};
    line-height: ${$textSmallLh};
    max-height: ${$textSmallMaxHeight2};
    color: #444;
    font-weight: bold;
    ${mixin.ellipsis2(2)};
  }
  .sub-title-medium {
    font-size: ${$textMedium};
    line-height: ${$textMediumLh};
    max-height: ${$textMediumMaxHeight};
    color: #666;
    ${mixin.ellipsis2(2)};
  }
  .sub-title {
    font-size: ${$textSmall};
    line-height: ${$textSmallLh};
    max-height: ${$textSmallMaxHeight};
    color: #666;
    ${mixin.ellipsis2(1)};
  }
  .sub-title-tiny {
    line-height: ${$textTinyLh};
    font-size: ${$textTiny};
    max-height: ${$textTinyMaxHeight};
    color: #666;
    ${mixin.ellipsis2(1)};
  }
  .third-title {
    font-size: ${$textSmall};
    line-height: ${$textSmallLh};
    max-height: ${$textSmallMaxHeight};
    color: #999;
    ${mixin.ellipsis2(1)};
  }
  .third-title-tiny {
    line-height: ${$textTinyLh};
    font-size: ${$textTiny};
    max-height: ${$textTinyMaxHeight};
    color: #999;
    ${mixin.ellipsis2(1)};
  }
`
