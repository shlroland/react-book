import { useCallback } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { Book } from 'epubjs'

export const useToggleMenuVisible = () => {
  const ebookStore = useEbookStore()
  const toggleMenuVisible = useCallback(() => {
    ebookStore.changeMenuVisible(!ebookStore.menuVisible)
  }, [ebookStore])
  return toggleMenuVisible
}

export const useDisplay = () => {
  const ebookStore = useEbookStore()
  const display = useCallback(
    (target: string) => {
      ;(ebookStore.currentBook as Book).rendition.display(target)
    },
    [ebookStore]
  )

  return display
}

export const useRefreshLocation = () => {}
