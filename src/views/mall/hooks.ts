import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

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
