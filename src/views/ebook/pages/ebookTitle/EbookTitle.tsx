import React, { memo, FC } from 'react'
import EbookTitleWrapper from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'

const EbookTitle: FC = () => {
  const ebookStore = useEbookStore()
  return useObserver(() => (
    <CSSTransition
      in={ebookStore.menuVisible}
      timeout={300}
      classNames="slide-down"
      appear={true}
      unmountOnExit
    >
      <EbookTitleWrapper>
        <div className="left">
          <span className="icon-back"></span>
        </div>
        <div className="right">
          <div className="icon-wrapper">
            <span className="icon-shelf"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-cart"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-more"></span>
          </div>
        </div>
      </EbookTitleWrapper>
    </CSSTransition>
  ))
}

export default memo(EbookTitle)
