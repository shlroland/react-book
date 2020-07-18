import { useCallback } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'


export const useToggleMenuVisible = () => {
  const ebookStore = useEbookStore()
  const toggleMenuVisible = useCallback(() => {
    ebookStore.changeMenuVisible(!ebookStore.menuVisible)
  }, [ebookStore])
  return toggleMenuVisible
}
