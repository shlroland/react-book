import React from 'react'
import styled from 'styled-components'
import { px2vw, mixin } from '@assets/style'
import { useSectionName } from '../hooks'

const EbookHeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: ${px2vw(48)};
  padding: 0 ${px2vw(15)};
  box-sizing: border-box;
  overflow: hidden;
  ${mixin.left()}
  .ebook-header-text {
    font-size: ${px2vw(12)};
    color: #6d7178;
  }
`

const EbookHeader = () => {
  const sectionName = useSectionName()
  return (
    <EbookHeaderWrapper>
      <span className="ebook-header-text">{sectionName}</span>
    </EbookHeaderWrapper>
  )
}
export default EbookHeader
