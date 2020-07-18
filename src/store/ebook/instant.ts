import { EbookStoreReturn } from './types'
import { Book } from 'epubjs'
import { Default, Eye, Gold, Night } from '@/assets/styles/theme'

function EbookStore(): EbookStoreReturn {
  return {
    theme: Default,
    setTheme(themeType) {
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
    currentBook: null,
    changeCurrentBook(currentBook: Book) {
      this.currentBook = currentBook
    },

    fileName: 'epub',
    changeFileName(fileName) {
      this.fileName = fileName
    },

    menuVisible: false,
    changeMenuVisible(menuVisible) {
      this.menuVisible = menuVisible
    },

    offsetY: 0,
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
    changeSettingVisible(settingVisible) {
      this.settingVisible = settingVisible
    },

    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    changeDefaultFontFamily(fontFamily) {
      this.defaultFontFamily = fontFamily
    },
  }
}

export default EbookStore
