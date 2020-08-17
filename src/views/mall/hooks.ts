import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import { categoryText, getCategoryName } from '@/utils/book'
import { useTranslation } from 'react-i18next'

export const useShowBookDetail = () => {
  const history = useHistory()

  const showBookDetail = useCallback(
    (book) => {
      history.push(`/mall/detail/${book.fileName}`, {
        category: book.categoryText,
      })
    },
    [history]
  )
  return showBookDetail
}

export const useShowBookCategory = () => {
  const history = useHistory()
  const { t } = useTranslation(['category', 'home'])
  const showBookCategory = useCallback(
    (item) => {
      history.push({
        pathname: '/mall/list',
        search: `?${qs.stringify({
          category: getCategoryName(item.category),
          categoryText: categoryText(item.category, t),
        })}`,
      })
    },
    [history, t]
  )
  return showBookCategory
}