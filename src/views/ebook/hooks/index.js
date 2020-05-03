import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { changeProgress, changeSection } from '../store/actionCreators'
import { saveLocation, saveProgress,getProgress } from '@/utils/localStorage'

export const useRefreshLocation = () => {
  const dispatch = useDispatch()
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )
  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))
  const refreshLocation = useCallback(() => {
    const currentLocation = currentBook.rendition.currentLocation()
    if (currentLocation.start && currentLocation.start.index) {
      dispatch(changeSection(currentLocation.start.index))
      const startCfi = currentLocation.start.cfi
      const startProgress = currentBook.locations.percentageFromCfi(startCfi)
      const cacheProgress = getProgress(fileName)
      if (startProgress === 0 && cacheProgress > 0) {
        dispatch(changeProgress(Math.floor(cacheProgress * 100)))
      } else if (startProgress > 0) {
        dispatch(changeProgress(Math.floor(startProgress * 100)))
        saveProgress(fileName,startProgress)
      }
      saveLocation(fileName, startCfi)
    }
  }, [currentBook, dispatch, fileName])
  return refreshLocation
}

export const useDisplay = () => {
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )
  const refreshLocation = useRefreshLocation()
  const display = useCallback(
    (target, cb) => {
      if (currentBook) {
        if (target) {
          currentBook.rendition.display(target).then(() => {
            refreshLocation()
            if (cb) cb()
          })
        } else {
          console.log(currentBook)
          currentBook.rendition.display().then(() => {
            refreshLocation()
            if (cb) cb()
          })
        }
      }
    },
    [currentBook, refreshLocation]
  )
  return display
}
