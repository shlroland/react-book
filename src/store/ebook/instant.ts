import { EbookStoreReturn } from './types'
import { Book } from 'epubjs'
import { Default, Eye, Gold, Night } from '@/assets/styles/theme'

function EbookStore(): EbookStoreReturn {
  return {
    currentBook: null,
    changeCurrentBook(currentBook: Book) {
      this.currentBook = currentBook
    },

    fileName: 'epub',
    changeFileName(fileName: string) {
      this.fileName = fileName
    },

    theme: Default,
    setTheme(themeType) {
      switch (themeType) {
        case 'Gold':
          this.theme = Gold
          break
        case 'Eye':
          this.theme = Eye
          break
        case 'Night':
          this.theme = Night
          break
        default:
          this.theme = Default
          break
      }
    },
  }
}

export default EbookStore
