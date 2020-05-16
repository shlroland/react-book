import React from 'react'
import { useTranslation } from 'react-i18next'
import TitleView from './Title'
import { RecommendWrapper } from './style'

const Recommend = ({ data }) => {
  const { t } = useTranslation('home')
  return (
    <RecommendWrapper>
      <TitleView label={t('recommend')} btn={t('seeAll')}></TitleView>
      <div className="recommend-list">
        {data &&
          data.map((item) => {
            return (
              <div className="recommend-item" key={item.id}>
                <div className="img-wrapper">
                  <img className="img" alt="暂无显示" src={item.cover} />
                </div>
                <div className="content-wrapper">
                  <div className="title title-medium">{item.title}</div>
                  <div className="num sub-title">
                    {t('readers', { renders: item.readers })}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </RecommendWrapper>
  )
}

export default Recommend
