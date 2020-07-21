import { useEffect, useCallback } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { NavItem, Book } from 'epubjs'
import { getFontSize } from '@/utils/localStorage'
import Navigation from 'epubjs/types/navigation'
import { ebookNavItem } from '@/store/ebook/types'

export const useParseBook = () => {
  const ebookStore = useEbookStore()
  const initPagination = useCallback(async () => {
    await (ebookStore.currentBook as Book).ready
    const locations  = (ebookStore.currentBook as Book).locations.generate(
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

  useEffect(() => {
    Promise.all([initPagination(), initNavigation()]).then((initItem) => {
      const [pagelist, navigation] = initItem
      console.log(pagelist)
      pagelist.forEach((location) => {
          const loc = (location.match(/\[(.*)\]!/) as RegExpMatchArray)[1]
          navigation.forEach((item) => {
            if (item.idhref && item.idhref.indexOf(loc) >= 0) {
              (item.pagelist as any[]).push(location)
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
  }, [ebookStore, initNavigation, initPagination])
}
