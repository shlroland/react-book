import { EbookStoreReturn } from './types'
import { Book } from 'epubjs'
import { Default, Eye, Gold, Night } from '@/assets/styles/theme'
import {
  getFontSize,
  saveFontSize,
  getFontFamily,
  saveFontFamily,
  getTheme,
  saveTheme,
  saveProgress,
} from '@/utils/localStorage'
import { genThemeList } from '@/utils/book'

function EbookStore(): EbookStoreReturn {
  return {
    currentBook: null,
    changeCurrentBook(currentBook: Book) {
      this.currentBook = currentBook
    },

    fileName: '',
    changeFileName(fileName) {
      this.fileName = fileName
    },

    menuVisible: false,
    changeMenuVisible(menuVisible) {
      this.menuVisible = menuVisible
    },

    offsetY: 0,
    changeOffsetY(offsetY) {
      this.offsetY = offsetY
    },
    get Y() {
      if (!this.menuVisible) {
        return this.offsetY
      } else {
        return 0
      }
    },

    settingVisible: -1,
    fontFamilyVisible: false,
    changeFontFamilyVisible(visible) {
      this.fontFamilyVisible = visible
    },
    get fontSettingVisible() {
      return this.menuVisible && this.settingVisible === 0
    },
    get themeSettingVisible() {
      return this.menuVisible && this.settingVisible === 1
    },
    get progressSettingVisible() {
      return this.menuVisible && this.settingVisible === 2
    },
    get slideVisible() {
      return this.menuVisible && this.settingVisible === 3
    },
    changeSettingVisible(settingVisible) {
      this.settingVisible = settingVisible
    },

    defaultFontSize: 16,
    defaultFontFamily: 'Times New Roman',
    changeDefaultFontFamily(fontFamily) {
      this.defaultFontFamily = fontFamily
      saveFontFamily(this.fileName, fontFamily)
    },
    changeDefaultFontSize(fontSize) {
      this.defaultFontSize = fontSize
      saveFontSize(this.fileName, fontSize)
    },
    initDefaultFontSize() {
      this.defaultFontSize = getFontSize(this.fileName) || this.defaultFontSize
    },
    initDefaultFontFamily() {
      this.defaultFontFamily =
        getFontFamily(this.fileName) || this.defaultFontFamily
    },

    theme: Default,
    ebookTheme: 'Default',
    ebookThemeList: [],
    setTheme(themeType) {
      saveTheme(this.fileName, themeType)
      this.ebookTheme = themeType
      switch (themeType) {
        case 'Gold':
          this.theme = Gold
          break
        case 'Eye':
          this.theme = Eye
          break
        case 'Night':
          this.theme = Night
          break
        default:
          this.theme = Default
          break
      }
    },
    initEbookTheme(t) {
      const cacheTheme = getTheme(this.fileName) || this.ebookTheme
      this.setTheme(cacheTheme)
      this.ebookThemeList = genThemeList(t)
    },

    readTime: 0,
    changeReadTime(time) {
      this.readTime = time
    },

    section: 0,
    changeSection(section) {
      this.section = section
    },
    progress: 0,
    changeProgress(progress) {
      this.progress = progress
      saveProgress(this.fileName, progress)
    },

    isPaginating: true,
    changeIsPaginating(isPaginating) {
      this.isPaginating = isPaginating
    },
    bookAvailable: false,
    changeBookAvailable(bookAvailable) {
      this.bookAvailable = bookAvailable
    },
    pagelist: [],
    changPageLIst(pagelist) {
      this.pagelist = pagelist
    },
    paginate: '',
    changPaginate(paginate) {
      this.paginate = paginate
    },
    navigation: [],
    changeNavigation(navigation) {
      this.navigation = navigation
    },
    get sectionName() {
      if (this.section && this.navigation) {
        const sectionInfo = (this.currentBook as Book).section(this.section)
        if (
          sectionInfo &&
          sectionInfo.href &&
          (this.currentBook as Book).navigation
        ) {
          return this.navigation[this.section]?.label
        }
      }
      return ''
    },
    metadata: null,
    changeMetadata(metadata) {
      this.metadata = metadata
    },
    cover: '',
    changeCover(url) {
      this.cover = url
    },
    isBookMark: false,
    changeIsBookMark(bookMark) {
      this.isBookMark = bookMark
    },
  }
}

export default EbookStore
