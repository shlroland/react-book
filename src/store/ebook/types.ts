import { Book } from 'epubjs'
import Store from './instant'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
}

export type storeType = ReturnType<typeof Store>
