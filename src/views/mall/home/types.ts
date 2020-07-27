
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

export interface RecommendItem extends GuessYouLikeItem {
  readers: number
}

export interface HomeStoreReturn {
  offsetY: number
  setOffsetY(offsetY: number): void
  readonly height: number
  guessYouLikeList: GuessYouLikeItem[]
  recommendList: RecommendItem[]
  parseHomeData: (data: any) => void
  bannerImage: string
}
