import { useCallback } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { Book } from 'epubjs'
import { DisplayedLocation } from 'epubjs/types/rendition'
import { saveLocation, getProgress } from '@/utils/localStorage'

interface EbookDisplayedLocation extends DisplayedLocation {
  location: number
  percentage: number
}

interface Location {
  start: EbookDisplayedLocation
  end: EbookDisplayedLocation
}

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
    async (target: string,highlight = false) => {
      return (ebookStore.currentBook as Book).rendition.display(target).then(()=>{
          
      })
    },
    [ebookStore]
  )

  return display
}

export const useRefreshLocation = () => {
  const ebookStore = useEbookStore()
  const refreshLocation = useCallback(() => {
    const currentLocation = ((ebookStore.currentBook as Book).rendition.currentLocation() as unknown) as Location
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
    saveLocation(ebookStore.fileName, cfistart)
  }, [ebookStore])
  return refreshLocation
}
