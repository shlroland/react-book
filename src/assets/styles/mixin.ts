// import { px2vw } from './function'
import { css } from 'styled-components'

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

export const ellipsis2 = ($line: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${$line};
  word-break: keep-all;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`
