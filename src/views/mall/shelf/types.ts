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
  edit?: number
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

export type categoryListItem = CategoryItem | { title: string; edit: number }

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
  setDownload: (v: boolean) => Promise<void>
  downloadBook: (item: BookItem) => void
  downloadItem: (item: BookItem, needDownload: boolean) => Promise<void>
  groupEdit: (operation: number, group: categoryListItem) => void
  moveToGroup: (group: CategoryItem) => void
  removeDownloadBook: (item: BookItem) => void
  removeBook: () => void
  readonly getSelectedBooks: BookItem[]
  clearSelectedBooks: () => void
  clearAddFromBookList: () => void
  newGroup: (group: CategoryItem) => void
}

export interface BookShelfCategoryReturn {
  bookList: BookList
  category: CategoryItem | null
  ifShowBack: boolean
  ifShowClear: boolean
  isEditMode: boolean
  scrollBottom: number
  readonly isEmpty: boolean
  onEditClick: (v: boolean) => void
  changeBookList: (bookList: BookList) => void
  changeCategory: (index: number) => void
  setPrivate: (v: boolean) => void
  saveBookShelfToLocalStorage(): void
  setDownload: (v: boolean) => Promise<void>
  downloadBook: (item: BookItem) => void
  downloadItem: (item: BookItem, needDownload: boolean) => Promise<void>
  removeDownloadBook: (item: BookItem) => void
  removeBook: () => void
  groupEdit: (operation: number, group: categoryListItem) => void
  newGroup: (group: CategoryItem) => void
  moveToGroup: (group: CategoryItem) => void
  readonly getSelectedBooks: BookItem[]
  clearSelectedBooks: () => void
  clearAddFromBookList: () => void
  appendAddToBookList: () => void
  moveOutGroup: () => void
  appendBookToList: () => void
}
