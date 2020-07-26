export interface GuessYouLikeItem {
  author: string
  bookId: string
  cache: boolean
  category: number
  categoryText: string
  cover: string
  fileName: string
  haveRead: number
  id: number
  language: string
  percent: string
  private: boolean
  publisher: string
  result: string
  selected: boolean
  title: string
  type: number
}

export interface HomeStoreReturn {
  offsetY: number
  setOffsetY(offsetY: number): void
  readonly height: 52 | 94
  guessYouLikeList: GuessYouLikeItem[]
  parseHomeData: (data: any) => void
}
