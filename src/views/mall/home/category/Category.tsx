import React, { FC, memo } from 'react'
// import { useHistory } from 'react-router-dom'
import TitleView from '../title/Title'
import { useTranslation } from 'react-i18next'
import { CategoryWrapper } from './style'
import { categoryText,getCategoryName } from '@/utils/book'
import { CategoriesItem } from '../types'
// import qs from 'qs'

interface CategoryProp {
    data: CategoriesItem[]
}

const Category:FC<CategoryProp> = ({ data }) => {
//   const history = useHistory()
  const { t } = useTranslation(['category', 'home'])

//   const showBookCategory = useCallback((item)=>{
//     history.push({
//       pathname: '/book-store/list',
//       search: `?${qs.stringify({
//         category: getCategoryName(item.category),
//         categoryText: categoryText(item.category,t)
//       })}`
//     })
//   },[history, t])
  return (
    <CategoryWrapper>
      <TitleView label={t('home:category')} btn={t('home:seeAll')}></TitleView>
      <div className="category-list">
        {data &&
          data.map((item) => {
            return (
              <div className="category-item-wrapper" key={item.category}>
                <div className="category-item">
                  <div className="content-wrapper">
                    <div className="title title-medium">
                      {categoryText(item.category, t)}
                    </div>
                    <div className="num sub-title-tiny">
                      {item.num + ' ' + t('home:books')}
                    </div>
                  </div>
                  <div className="img-wrapper">
                    <div className="img-group">
                      <img className="img" src={item.img1} alt="暂无图片" />
                      <img className="img2" src={item.img2} alt="暂无图片" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </CategoryWrapper>
  )
}
export default memo(Category)
