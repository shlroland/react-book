import React from 'react'
import styled from 'styled-components'
import { px2vw } from '@assets/style'

const BookMarkWrapper = styled.div`
  width: 0;
  height: 0;
  font-weight: bold;
  line-height: 0;
  border-width: ${px2vw(30)} ${px2vw(7.5)} ${px2vw(5)} ${px2vw(7.5)};
  border-style: solid;
  border-color: ${props=>props.theme[props.color]} ${props=>props.theme[props.color]} transparent ${props=>props.theme[props.color]};
  z-index: ${props=> props.beFixed ? '210': ''};
`

const BookMark = ({color,beFixed}) => {
  return <BookMarkWrapper color={color} beFixed={beFixed}></BookMarkWrapper>
}

export default BookMark
