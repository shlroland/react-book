import { Book, NavItem } from 'epubjs'
import Store from './instant'
import { themeProp } from '@/assets/styles/theme'
import { ebookItemType } from '@/utils/book'
import { TFunction } from 'i18next'
import { PackagingMetadataObject } from 'epubjs/types/packaging'
import { DisplayedLocation } from 'epubjs/types/rendition'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  menuVisible: boolean
  offsetY: number
  Y: number
  settingVisible: settingVisibleProp
  fontSettingVisible: boolean
  themeSettingVisible: boolean
  fontFamilyVisible: boolean
  progressSettingVisible: boolean
  slideVisible: boolean
  defaultFontSize: number
  defaultFontFamily: defaultFontFamily
  theme: themeProp
  ebookTheme: themeType
  ebookThemeList: ebookItemType[]
  readTime: number
  section: number
  progress: number
  isPaginating: boolean
  bookAvailable: boolean
  pagelist: string[]
  navigation: ebookNavItem[]
  sectionName: string
  paginate: string
  metadata: PackagingMetadataObject | null
  cover: string
  isBookMark: boolean
  setTheme: (themeType: themeType) => void
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  changeMenuVisible: (menuVisible: boolean) => void
  changeOffsetY: (offsetY: number) => void
  changeSettingVisible: (settingVisible: settingVisibleProp) => void
  changeFontFamilyVisible: (fontFamilyVisible: boolean) => void
  changeDefaultFontFamily: (fontFamily: defaultFontFamily) => void
  changeDefaultFontSize: (fontSize: number) => void
  changeReadTime: (readTime: number) => void
  changeSection: (section: number) => void
  changeProgress: (progress: number) => void
  changeIsPaginating: (isPaginating: boolean) => void
  changeBookAvailable: (bookAvailable: boolean) => void
  changPageLIst: (pagelist: string[]) => void
  changeNavigation: (navigation: ebookNavItem[]) => void
  changPaginate: (paginate: string) => void
  changeMetadata: (metadata: PackagingMetadataObject) => void
  changeCover: (url: string) => void
  changeIsBookMark: (bookMark: boolean) => void
  initDefaultFontSize: () => void
  initDefaultFontFamily: () => void
  initEbookTheme: (t: TFunction) => void
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type settingVisibleProp = -1 | 0 | 1 | 2 | 3

export type defaultFontFamily =
  | 'Cabin'
  | 'Days One'
  | 'Montserrat'
  | 'Tangerine'
  | 'Times New Roman'

export interface ebookNavItem extends NavItem {
  level?: number
  total?: number
  pagelist?: any[]
  idhref?: string
  page?: number
}

export type storeType = ReturnType<typeof Store>

export interface EbookDisplayedLocation extends DisplayedLocation {
  location: number
  percentage: number
}

export interface Location {
  start: EbookDisplayedLocation
  end: EbookDisplayedLocation
}
