import { Book } from 'epubjs'
import Store from './instant'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  menuVisible: boolean
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  changeMenuVisible: (menuVisible: boolean) => void
}

export type storeType = ReturnType<typeof Store>
