import React from 'react'
import { SlideBookmark } from '../style'
import { useTranslation } from 'react-i18next'
import { getBookmark } from '@/utils/localStorage'
import { useSelector } from 'react-redux'
import { useDisplay } from '../hooks'
import Scroll from '@/common/scroll'

const EbookSlideBookMark = () => {
  const { t } = useTranslation('book')
  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))
  const display = useDisplay()

  const bookmark = getBookmark(fileName)

  console.log(bookmark)
  return (
    <SlideBookmark>
      <div className="slide-bookmark-title">
        {t('bookmark')} · {bookmark ? bookmark.length : 0}
      </div>
      <Scroll className={['slide-bookmark-list']} top={48} bottom={48}>
        {bookmark
          ? bookmark.map((item, index) => {
              return (
                <div
                  className="slide-bookmark-item"
                  key={index}
                  onClick={() => display(item.cfi)}
                >
                  <div className="slide-bookmark-item-icon">
                    <div className="icon-bookmark" />
                  </div>
                  <div className="slide-bookmark-item-text">{item.text}</div>
                </div>
              )
            })
          : null}
      </Scroll>
    </SlideBookmark>
  )
}

export default EbookSlideBookMark
