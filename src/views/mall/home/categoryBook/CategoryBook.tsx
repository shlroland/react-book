import React, { memo, FC } from 'react'
import TitleView from '../title/Title'
import { useTranslation } from 'react-i18next'
import { CategoryBookWrapper } from './style'
import { categoryText } from '@/utils/book'
import { CategoryListItem } from '../types'

interface CategoryBookProp {
    data:CategoryListItem
}

const CategoryBook:FC<CategoryBookProp> = ({ data }) => {
  const { t } = useTranslation(['category', 'home'])
  return (
    <CategoryBookWrapper>
      <TitleView
        label={categoryText(data.category, t)}
        btn={t('home:seeAll')}
      ></TitleView>
      <div className="category-book-list">
        {data &&
          data.list.map((item,index) => {
            return (
              <div className="category-book-item" key={item.bookId}>
                <div className="img-wrapper">
                  <img className="img" src={item.cover} alt="暂无图片" />
                </div>
                <div className="content-wrapper">
                  <div className="title title-small">{item.title}</div>
                  <div className="num sub-title-tiny">{item.author}</div>
                </div>
              </div>
            )
          })}
      </div>
    </CategoryBookWrapper>
  )
}
export default memo(CategoryBook)