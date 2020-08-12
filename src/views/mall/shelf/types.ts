export interface BookItem {
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
  private: boolean
  publisher: string
  rootFile: string
  selected: boolean
  title: string
  type: number
  [property: string]: any
}

export interface CategoryItem {
  id: number
  itemList: BookItem[]
  selected: boolean
  title: string
  type: number
}

export interface AddItem {
  cover: ''
  title: ''
  type: 3
  id: number
  [property: string]: any
}

export type BookListItem = BookItem | CategoryItem | AddItem

export type BookList = BookListItem[]

export interface BookShelfStoreReturn {
  bookList: BookList
  isEditMode: boolean
  scrollBottom: number
  showType: number
  ifShowBack: boolean
  isShowClear: boolean
  ifShowTitle: boolean
  changeBookList: (bookList: BookList) => void
  setIsEditMode: (flag: boolean) => void
  saveBookShelfToLocalStorage(): void
  getBookShelfFromLocalStorage(): BookList
  appendAddToBookList: () => void
  initBookShelf: () => void
  onSearchClick: () => void
  onSearchTabClick: (id: number) => void
  onSearchCancel: () => void
  onEditClick: (v: boolean) => void
  setPrivate: (v: boolean) => void
}
