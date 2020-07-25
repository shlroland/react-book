import { useEffect, useCallback } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { NavItem, Book, Contents } from 'epubjs'
import { getFontSize, getLocation, saveMetadata } from '@/utils/localStorage'
import Navigation from 'epubjs/types/navigation'
import { ebookNavItem } from '@/store/ebook/types'
import { useTranslation } from 'react-i18next'
import { useDisplay, useRefreshLocation } from '../hooks'
import { reaction, toJS } from 'mobx'
import { ebookItemType } from '@/utils/book'
import { isRendition } from '@/utils/utils'

export const useParseBook = () => {
  const ebookStore = useEbookStore()
  const initPagination = useCallback(async () => {
    await (ebookStore.currentBook as Book).ready
    const locations = (ebookStore.currentBook as Book).locations.generate(
      750 * (window.innerWidth / 375) * (getFontSize(ebookStore.fileName) / 16)
    ) as string[]
    return locations
  }, [ebookStore])

  const initNavigation = useCallback(async () => {
    const nav: Navigation = await (ebookStore.currentBook as Book).loaded
      .navigation
    const navItem = (function flatten(arr: ebookNavItem[]): ebookNavItem[] {
      return ([] as NavItem[]).concat(
        ...arr.map((v: any) => [v, ...flatten(v.subitems)])
      )
    })(nav.toc)
    function find(item: ebookNavItem, v = 0): number {
      const parent = navItem.filter((it) => it.id === item.parent)[0]
      return !item.parent ? v : parent ? find(parent, ++v) : v
    }
    navItem.forEach((item) => {
      item.level = find(item)
      item.total = 0
      item.pagelist = []
      if (item.href.match(/^(.*)\.html$/)) {
        item.idhref = (item.href.match(/^(.*)\.html$/) as RegExpMatchArray)[1]
      } else if (item.href.match(/^(.*)\.xhtml$/)) {
        item.idhref = (item.href.match(/^(.*)\.xhtml$/) as RegExpMatchArray)[1]
      }
    })
    return navItem
  }, [ebookStore])

  const initMetadata = useCallback(async () => {
    const metadata = await (ebookStore.currentBook as Book).loaded.metadata
    ebookStore.changeMetadata(metadata)
    saveMetadata(ebookStore.fileName, metadata)
  }, [ebookStore])

  const initCover = useCallback(async () => {
    const cover = await (ebookStore.currentBook as Book).loaded.cover
    const url = await (ebookStore.currentBook as Book).archive.createUrl(
      cover,
      {
        base64: true,
      }
    )
    ebookStore.changeCover(url)
  }, [ebookStore])

  useEffect(() => {
    Promise.all([
      initPagination(),
      initNavigation(),
      initMetadata(),
      initCover(),
    ]).then((initItem) => {
      const [pagelist, navigation] = initItem
      pagelist.forEach((location) => {
        const loc = (location.match(/\[(.*)\]!/) as RegExpMatchArray)[1]
        navigation.forEach((item) => {
          if (item.idhref && item.idhref.indexOf(loc) >= 0) {
            ;(item.pagelist as any[]).push(location)
          }
        })
        let currentPage = 1
        navigation.forEach((item, index) => {
          if (index === 0) {
            item.page = 1
          } else {
            item.page = currentPage
          }
          currentPage += (item.pagelist as any[]).length + 1
        })
      })
      ebookStore.changPageLIst(pagelist)
      ebookStore.changeNavigation(navigation)
      ebookStore.changeIsPaginating(false)
      ebookStore.changeBookAvailable(true)
    })
  }, [ebookStore, initCover, initMetadata, initNavigation, initPagination])
}

export const useInit = () => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')
  const display = useDisplay()
  const refreshLocation = useRefreshLocation()
  const rendition = ebookStore.currentBook?.rendition

  useEffect(() => {
    Promise.all([
      ebookStore.initDefaultFontSize(),
      ebookStore.initDefaultFontFamily(),
      ebookStore.initEbookTheme(t),
    ]).then(() => {
      const location = getLocation(ebookStore.fileName)
      if (location) {
        display(location).then(() => {
          refreshLocation()
        })
      }
    })
    if (isRendition(rendition)) {
      rendition.hooks.content.register((contents: Contents) => {
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/daysOne.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/tangerine.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/montserrat.css`
        )
        contents.addStylesheet(
          `${process.env.REACT_APP_BASE_URL}/fonts/cabin.css`
        )
      })
    }

    const cleanUpFontSize = reaction(
      () => ebookStore.defaultFontSize,
      (fontSize) => {
        if (isRendition(rendition)) {
          rendition.themes.fontSize(fontSize + 'px')
        }
      },
      {
        fireImmediately: true,
      }
    )

    const cleanUpFontFamily = reaction(
      () => ebookStore.defaultFontFamily,
      (fontFamily) => {
        if (isRendition(rendition)) {
          rendition.themes.font(fontFamily)
        }
      },
      {
        fireImmediately: true,
      }
    )

    const cleanUpTheme = reaction(
      () => ebookStore.ebookTheme,
      (theme) => {
        const { color, background } = toJS(
          ebookStore.ebookThemeList.find((item) => item.name === theme)
        ) as ebookItemType
        if (isRendition(rendition)) {
          rendition.themes.override('color', color)
          rendition.themes.override('background', background)
        }
      },
      {
        fireImmediately: true,
      }
    )
    return () => {
      cleanUpFontSize()
      cleanUpFontFamily()
      cleanUpTheme()
    }
  }, [display, ebookStore, refreshLocation, rendition, t])
}
