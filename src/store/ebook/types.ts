import { Book } from 'epubjs'
import Store from './instant'
import { themeProp } from '@/assets/styles/theme'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  theme: themeProp
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  setTheme: (themeType: themeType) => void
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type storeType = ReturnType<typeof Store>
