import React from 'react'
import TitleView from './Title'
import { useTranslation } from 'react-i18next'
import { categoryText } from '@/utils/book'
import { FeaturedWrapper } from './style'

const Featured = ({data}) => {
  const { t } = useTranslation(['category', 'home'])
  return (
    <FeaturedWrapper>
      <TitleView label={t('home:featured')} btn={t('home:seeAll')}></TitleView>
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
export default Featured
