import React from 'react'
import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import { useSelector } from 'react-redux'

const EbookFooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: ${px2vw(48)};
  padding: 0 ${px2vw(15)};
  box-sizing: border-box;
  ${mixin.right()}
  .ebook-footer-text {
    font-size: ${px2vw(12)};
    color: #6d7178;
  }
`

const EbookHeader = () => {
  const progress = useSelector((state) => state.getIn(['ebook', 'progress']))

  return (
    <EbookFooterWrapper>
      <span className="ebook-footer-text">{progress + '%'}</span>
    </EbookFooterWrapper>
  )
}
export default EbookHeader
