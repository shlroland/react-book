import { css } from 'styled-components'
import px2vw from './px2vw'

export const center = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const top = () => css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const bottom = () => css`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const left = () => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const right = () => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const scroll = () => css`
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const leftBottom = () => css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

export const rightBottom = () => css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const columnCenter = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const columnTop = () => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const columnTopLeft = () => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const columnLeft = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const absCenter = () => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`

export const ellipsis = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ellipsis2 = ($line) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${$line};
  word-break: keep-all;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`

export const shelfImgHeight = css`
  @media screen and (max-width: 414px) {
    height: ${px2vw(123)};
  }
  @media screen and (min-width: 415px) and (max-width: 500px) {
    height: ${px2vw(135)};
  }
  @media screen and (min-width: 501px) and (max-width: 600px) {
    height: ${px2vw(155)};
  }
  @media screen and (min-width: 601px) and (max-width: 700px) {
    height: ${px2vw(155)};
  }
  @media screen and (min-width: 701px) and (max-width: 800px) {
    height: ${px2vw(155)};
  }
  @media screen and (min-width: 801px) {
    height: ${px2vw(155)};
  }
`
export const variableColor = {
  $colorGreen: 'rgb(59, 201, 22)',
  $colorPink: 'rgb(255, 102, 159)',
  $colorBlue: 'rgb(74, 171, 255)',
  $colorYellow: 'rgb(255, 198, 102)',
  $colorGreenTransparent: 'rgba(59, 201, 22, .5)',
  $colorPinkTransparent: 'rgba(255, 102, 159, .5)',
  $colorBlueTransparent: 'rgba(74, 171, 255, .5)',
  $colorYellowTransparent: 'rgba(255, 198, 102, .5)',
}
