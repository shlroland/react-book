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

    
  }
}

export default EbookStore
