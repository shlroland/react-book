import { useHistory } from 'react-router-dom'

export const useShowBookDetail = () => {
  const history = useHistory()

    return (book)=> {
        history.push(`/book-store/detail/${book.fileName}`, {
            category: book.categoryText,
          })
    }
}