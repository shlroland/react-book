import { EbookStoreReturn } from './types'
import { Book } from 'epubjs'

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

    menuVisible: false,
    changeMenuVisible(menuVisible) {
      this.menuVisible = menuVisible
    }
  }
}

export default EbookStore
