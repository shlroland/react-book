import { Book } from 'epubjs'
import Store from './instant'
import { themeProp } from '@/assets/styles/theme'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  menuVisible: boolean
  offsetY: number
  Y: number
  theme: themeProp
  setTheme: (themeType: themeType) => void
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  changeMenuVisible: (menuVisible: boolean) => void
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type storeType = ReturnType<typeof Store>
