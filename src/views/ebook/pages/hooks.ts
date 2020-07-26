import { useCallback } from 'react'
import { useStore as useEbookStore, types } from '@/store/ebook'
import { Book } from 'epubjs'
import {
  saveLocation,
  getProgress,
  getBookmark,
  bookmarkItem,
} from '@/utils/localStorage'
import { isBook } from '@/utils/utils'

export const useToggleMenuVisible = () => {
  const ebookStore = useEbookStore()
  const toggleMenuVisible = useCallback(() => {
    ebookStore.changeMenuVisible(!ebookStore.menuVisible)
  }, [ebookStore])
  return toggleMenuVisible
}

export const useDisplay = () => {
  const ebookStore = useEbookStore()
  const refreshLocation = useRefreshLocation()
  const display = useCallback(
    async (target: string, highlight: boolean = false) => {
      if (isBook(ebookStore.currentBook)) {
        if (target) {
          return ebookStore.currentBook.rendition.display(target).then(() => {
            if (highlight) {
              if (target.startsWith('epubcfi')) {
                ;(((ebookStore.currentBook as Book).getRange(
                  target
                ) as unknown) as Promise<Range>).then((res) => {
                  ;(ebookStore.currentBook as Book).rendition.annotations.highlight(
                    target
                  )
                })
              }
            }
            return refreshLocation()
          })
        } else {
          return ebookStore.currentBook.rendition.display().then(() => {
            return refreshLocation()
          })
        }
      }
    },
    [ebookStore.currentBook, refreshLocation]
  )

  return display
}

export const useRefreshLocation = () => {
  const ebookStore = useEbookStore()
  const refreshLocation = useCallback(() => {
    const currentLocation = ((ebookStore.currentBook as Book).rendition.currentLocation() as unknown) as types.Location
    ebookStore.changeSection(currentLocation.start.index)
    if (currentLocation.start && currentLocation.start.index) {
      const progress =
        (ebookStore.currentBook as Book).locations.percentageFromCfi(
          currentLocation.start.cfi
        ) || getProgress(ebookStore.fileName) / 100
      ebookStore.changeProgress(Math.floor(progress * 100))
      if (currentLocation.start.location <= 0) {
        ebookStore.changPaginate('')
      } else {
        ebookStore.changPaginate(
          currentLocation.start.location + ' / ' + ebookStore.pagelist.length
        )
      }
    } else {
      ebookStore.changPaginate('')
    }
    const cfistart = currentLocation.start.cfi
    const bookmark: bookmarkItem[] = getBookmark(ebookStore.fileName)
    if (bookmark) {
      if (bookmark.some((item) => item.cfi === cfistart)) {
        ebookStore.changeIsBookMark(true)
      } else {
        ebookStore.changeIsBookMark(false)
      }
    } else {
      ebookStore.changeIsBookMark(false)
    }
    saveLocation(ebookStore.fileName, cfistart)
  }, [ebookStore])
  return refreshLocation
}
