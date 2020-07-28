import React, { FC, memo } from 'react'
import { FeaturedWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { FeaturedItem } from '../types'
import TitleView from '../title/Title'
import { categoryText } from '@/utils/book'

interface FeaturedProp {
  data: FeaturedItem[]
  titleText: string
  btnText: string
}

const Featured: FC<FeaturedProp> = ({ data, titleText, btnText }) => {
  const { t } = useTranslation(['category', 'home'])
  return (
    <FeaturedWrapper>
      <TitleView label={titleText} btn={btnText}></TitleView>
      <div className="featured-list">
        <div className="featured-item-wrapper">
          {data &&
            data.map((item) => {
              return (
                <div className="featured-item" key={item.id}>
                  <div className="img-wrapper">
                    <img className="img" src={item.cover} alt="暂无图片" />
                  </div>
                  <div className="content-wrapper">
                    <div className="title title-small">{item.title}</div>
                    <div className="author sub-title-tiny">{item.author}</div>
                    <div className="category third-title-tiny">
                      {categoryText(item.category, t)}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </FeaturedWrapper>
  )
}

export default memo(Featured)
