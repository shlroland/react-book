import { Book } from 'epubjs'
import Store from './instant'
import { themeProp } from '@/assets/styles/theme'

export interface EbookStoreReturn {
  currentBook: Book | null
  fileName: string
  menuVisible: boolean
  offsetY: number
  Y: number
  theme: themeProp
  settingVisible: settingVisibleProp
  fontSettingVisible: boolean
  defaultFontSize: number
  fontFamilyVisible: boolean
  defaultFontFamily: defaultFontFamily
  setTheme: (themeType: themeType) => void
  changeCurrentBook: (currentBook: Book) => void
  changeFileName: (fileName: string) => void
  changeMenuVisible: (menuVisible: boolean) => void
  changeSettingVisible: (settingVisible: settingVisibleProp) => void
  changeFontFamilyVisible:(fontFamilyVisible:boolean)=>void
  changeDefaultFontFamily: (fontFamily: defaultFontFamily) => void
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type settingVisibleProp = -1 | 0 | 1 | 2 | 3

export type defaultFontFamily =
  | 'Default'
  | 'Cabin'
  | 'Days One'
  | 'Montserrat'
  | 'Tangerine'

export type storeType = ReturnType<typeof Store>
