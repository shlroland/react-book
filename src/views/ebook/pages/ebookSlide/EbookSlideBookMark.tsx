import React, { memo, FC } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { SlideBookmark } from './style'
import { useDisplay, useToggleMenuVisible } from '../hooks'
import { getBookmark, bookmarkItem } from '@/utils/localStorage'
import Scroll from '@/common/scroll/Scroll'
import { useTranslation } from 'react-i18next'

const EbookSlideBookMark: FC = () => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')
  const display = useDisplay()
  const toggleMenuVisible = useToggleMenuVisible()
  const bookmark:bookmarkItem[] = getBookmark(ebookStore.fileName)

  const handleDisplay = async (cfi:string,highlight:boolean) => {
    await display(cfi, highlight)
    toggleMenuVisible()
  }

  return (
    <SlideBookmark>
      <div className="slide-bookmark-title">
        {t('bookmark')} · {bookmark ? bookmark.length : 0}
      </div>
      <Scroll top={48} bottom={48}>
        <div className="slide-bookmark-list">
          {bookmark
            ? bookmark.map((item, index) => {
                return (
                  <div
                    className="slide-bookmark-item"
                    key={index}
                    onClick={() => handleDisplay(item.cfi, false)}
                  >
                    <div className="slide-bookmark-item-icon">
                      <div className="icon-bookmark" />
                    </div>
                    <div className="slide-bookmark-item-text">{item.text}</div>
                  </div>
                )
              })
            : null}
        </div>
      </Scroll>
    </SlideBookmark>
  )
}

export default memo(EbookSlideBookMark)
