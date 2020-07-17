import React, { memo, FC } from 'react'
import EbookMenuWrapper from './style'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'

const EbookTitle: FC = () => {
  const { menuVisible } = useEbookStore()
  return useObserver(() => (
    <CSSTransition
      in={menuVisible}
      timeout={300}
      classNames="slide-down"
      appear={true}
      unmountOnExit
    >
      <EbookMenuWrapper>
          <div
            className="icon-wrapper"
          >
            <span className="icon-menu"></span>
          </div>
          <div
            className="icon-wrapper"
          >
            <span className="icon-progress"></span>
          </div>
          <div
            className="icon-wrapper"
          >
            <span className="icon-bright"></span>
          </div>
          <div
            className="icon-wrapper"
          >
            <span className="icon-A"></span>
          </div>
        </EbookMenuWrapper>
    </CSSTransition>
  ))
}

export default memo(EbookTitle)