import React from 'react'
import { EbookTitleWrapper } from '../style/EbookTitle'

const EbookTitle = () => {
  return (
    <EbookTitleWrapper>
      <div class="left">
        <span class="icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </EbookTitleWrapper>
  )
}

export default EbookTitle
