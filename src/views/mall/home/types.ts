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

export interface FeaturedItem extends GuessYouLikeItem {}

export interface CategoryListItem {
  category: number
  list: Partial<GuessYouLikeItem>[]
}

export interface CategoriesItem {
  category: number
  num: number
  img1: string
  img2: string
}

export interface randomItem extends GuessYouLikeItem {}

export interface HomeStoreReturn {
  offsetY: number
  setOffsetY(offsetY: number): void
  readonly height: number
  guessYouLikeList: GuessYouLikeItem[]
  recommendList: RecommendItem[]
  featuredList: FeaturedItem[]
  categoryList: CategoryListItem[]
  categoriesList: CategoriesItem[]
  randomList: randomItem[]
  random: randomItem | null
  parseHomeData: (data: any) => void
  bannerImage: string
  showFlapCard: boolean
  setShowFlapCard: (flag: boolean) => void
  toggleShowFlapCard: () => void
}
