import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  fileName: '',
  menuVisible: false,
  settingVisible: -1,
  defaultFontSize: 16,
  defaultFontFamily: 'Default',
  fontFamilyVisible: false,
  defaultTheme: 'Default',
  bookAvailable: false,
  progress: 0,
  section: 0,
  isPaginating: true,
  currentBook: null,
  navigation: null,
  cover: null,
  metadata: null,
  paginate: '',
  pagelist: null,
  offsetY: 0,
  isBookmark: false,
  speakingIconBottom: 58,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILENAME:
      return state.set('fileName', action.data)
    case actionTypes.CHANGE_MENU_VISIBLE:
      return state.set('menuVisible', action.data)
    case actionTypes.CHANGE_CURRENT_BOOK:
      return state.set('currentBook',action.data)
    case actionTypes.CHANGE_SETTING_VISIBLE:
      return state.set('settingVisible', action.data)
    case actionTypes.CHANGE_DEFAULT_FONT_SIZE:
      return state.set('defaultFontSize',action.data)
    case actionTypes.CHANGE_DEFAULT_FONT_FAMILY:
      return state.set('defaultFontFamily',action.data)
    case actionTypes.CHANGE_FONT_FAMILY_VISIBLE:
      return state.set('fontFamilyVisible',action.data)
    case actionTypes.CHANGE_DEFAULT_THEME:
      return state.set('defaultTheme',action.data)
    case actionTypes.CHANGE_BOOK_AVAILABLE:
      return state.set('bookAvailable',action.data)
    case actionTypes.CHANGE_PROGRESS:
      return state.set('progress',action.data)
    case actionTypes.CHANGE_SECTION:
      return state.set('section',action.data)
    case actionTypes.CHANGE_IS_PAGINATING:
      return state.set('isPaginating',action.data)
    case actionTypes.CHANGE_NAVIGATION:
      return state.set('navigation',action.data)
    case actionTypes.CHANGE_COVER:
      return state.set('cover',action.data)
    case actionTypes.CHANGE_METADATA:
      return state.set('metadata',action.data)
    case actionTypes.CHANGE_PAGINATE:
      return state.set('paginate',action.data)
    case actionTypes.CHANGE_PAGELIST:
      return state.set('pagelist',action.data)
    case actionTypes.CHANGE_OFFSETY:
      return state.set('offsetY',action.data)
    case actionTypes.CHANGE_IS_BOOKMARK:
      return state.set('isBookmark',action.data)
    case actionTypes.CHANGE_SPEAKING_ICON_BOTTOM:
      return state.set('',action.data)
    default:
      return state
  }
}
