import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useMemo } from 'react'
import {
  changeProgress,
  changeSection,
  changeSettingVisible,
  changeFontFamilyVisible,
  changeMenuVisible,
  changeIsBookmark,
} from '../store/actionCreators'
import {
  saveLocation,
  saveProgress,
  getProgress,
  getBookmark,
} from '@/utils/localStorage'
import { getReadTimeByMinute } from '@/utils/book'
import { useTranslation } from 'react-i18next'

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
        saveProgress(fileName, startProgress)
      }
      const cfistart = currentLocation.start.cfi
      const bookmark = getBookmark(fileName)
      if (bookmark) {
        if (bookmark.some((item) => item.cfi === cfistart)) {
          dispatch(changeIsBookmark(true))
        } else {
          dispatch(changeIsBookmark(false))
        }
      } else {
        dispatch(changeIsBookmark(false))
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
    (target, highlight = false, cb) => {
      if (currentBook) {
        if (target) {
          currentBook.rendition.display(target).then(() => {
            if (highlight) {
              if (target.startsWith('epubcfi')) {
                currentBook.getRange(target).then(() => {
                  currentBook.rendition.annotations.highlight(
                    target,
                    {},
                    (e) => {}
                  )
                })
              }
            }
            refreshLocation()
            if (cb) cb()
          })
        } else {
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

export const useToggleMenuVisible = () => {
  const dispatch = useDispatch()
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const toggleMenuVisible = useCallback(() => {
    if (menuVisible) {
      dispatch(changeSettingVisible(-1))
      dispatch(changeFontFamilyVisible(false))
    }
    dispatch(changeMenuVisible(!menuVisible))
  }, [dispatch, menuVisible])
  return toggleMenuVisible
}

export const useGetReadTime = () => {
  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )
  const { t } = useTranslation('book')
  const getReadTime = useMemo(() => {
    const time = getReadTimeByMinute(fileName)
    return t('haveRead', { time })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName, t, settingVisible])
  return getReadTime
}

export const useSectionName = () => {
  const section = useSelector((state) => state.getIn(['ebook', 'section']))
  const navigation = useSelector((state) =>
    state.getIn(['ebook', 'navigation'])
  )

  const currentBook = useSelector((state) =>
  state.getIn(['ebook', 'currentBook'])
)

  const sectionName = useMemo(() => {
    if (section && navigation) {
      const sectionInfo = currentBook.section(section)
      if (
        sectionInfo &&
        sectionInfo.href &&
        currentBook.navigation &&
        navigation
      ) {
        return navigation[section].label
      }
    }
  }, [currentBook, navigation, section])

  return sectionName
}
