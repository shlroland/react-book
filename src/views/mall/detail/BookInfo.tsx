import React, { FC } from 'react'
import { BookInfoWrapper } from './style'
import { observer } from 'mobx-react'

interface BookInfoProp {
  author: string
  title: string
  cover: string
  desc: string
}

const BookInfo: FC<BookInfoProp> = observer(
  ({ author, title, cover, desc }) => {
    return (
      <BookInfoWrapper>
        <div className="cover-title-left-wrapper">
          <img className="cover-img" src={cover} alt="暂无图片" />
        </div>
        <div className="cover-title-right-wrapper">
          <div className="detail-cover-title-wrapper">
            <div className="cover-title-text">{title}</div>
          </div>
          <div className="cover-author-wrapper">
            <div className="cover-author-text">{author}</div>
          </div>
          <div className="detail-cover-description-wrapper">
            <div className="detail-cover-description-text">{desc}</div>
          </div>
        </div>
      </BookInfoWrapper>
    )
  }
)

export default BookInfo
