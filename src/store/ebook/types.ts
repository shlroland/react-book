import { Book } from 'epubjs'
import Store from './instant'
import { themeProp } from '@/assets/styles/theme'
import { ebookItemType } from '@/utils/book'
import { TFunction } from 'i18next'

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
  defaultFontSize: number
  defaultFontFamily: defaultFontFamily
  theme: themeProp
  ebookTheme: themeType
  ebookThemeList: ebookItemType[]
  setTheme: (themeType: themeType) => void
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  changeMenuVisible: (menuVisible: boolean) => void
  changeSettingVisible: (settingVisible: settingVisibleProp) => void
  changeFontFamilyVisible: (fontFamilyVisible: boolean) => void
  changeDefaultFontFamily: (fontFamily: defaultFontFamily) => void
  changeDefaultFontSize: (fontSize: number) => void
  initDefaultFontSize: () => void
  initDefaultFontFamily: () => void
  initEbookTheme: (t:TFunction) => void
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type settingVisibleProp = -1 | 0 | 1 | 2 | 3

export type defaultFontFamily =
  | 'Cabin'
  | 'Days One'
  | 'Montserrat'
  | 'Tangerine'
  | 'Times New Roman'

export type storeType = ReturnType<typeof Store>
