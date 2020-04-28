import * as actionTypes from './constants'
// import { fromJS } from 'immutable';

export const changeFileName = (data) => ({
  type: actionTypes.CHANGE_FILENAME,
  data,
})

export const changeMenuVisible = (data) => ({
  type: actionTypes.CHANGE_MENU_VISIBLE,
  data,
})

export const changeSettingVisible = (data) => ({
  type: actionTypes.CHANGE_SETTING_VISIBLE,
  data,
})

export const changeDefaultFontSize = (data) => ({
  type: actionTypes.CHANGE_DEFAULT_FONT_SIZE,
  data,
})
export const changeDefaultFontFamily = (data) => ({
  type: actionTypes.CHANGE_DEFAULT_FONT_FAMILY,
  data,
})
export const changeFontFamilyVisible = (data) => ({
  type: actionTypes.CHANGE_FONT_FAMILY_VISIBLE,
  data,
})
export const changeDefaultTheme = (data) => ({
  type: actionTypes.CHANGE_DEFAULT_THEME,
  data,
})
export const changeBookAvailable = (data) => ({
  type: actionTypes.CHANGE_BOOK_AVAILABLE,
  data,
})
export const changeProgress = (data) => ({
  type: actionTypes.CHANGE_PROGRESS,
  data,
})
export const changeSection = (data) => ({
  type: actionTypes.CHANGE_SECTION,
  data,
})
export const changeIsPaginating = (data) => ({
  type: actionTypes.CHANGE_IS_PAGINATING,
  data,
})
export const changeCurrentBook = (data) => ({
  type: actionTypes.CHANGE_CURRENT_BOOK,
  data,
})
export const changeNavigation = (data) => ({
  type: actionTypes.CHANGE_NAVIGATION,
  data,
})
export const changeCover = (data) => ({
  type: actionTypes.CHANGE_COVER,
  data,
})
export const changeMetadata = (data) => ({
  type: actionTypes.CHANGE_METADATA,
  data,
})
export const changePaginate = (data) => ({
  type: actionTypes.CHANGE_PAGINATE,
  data,
})
export const changePagelist = (data) => ({
  type: actionTypes.CHANGE_PAGELIST,
  data,
})
export const changeOffsety = (data) => ({
  type: actionTypes.CHANGE_OFFSETY,
  data,
})
export const changeIsBookmark = (data) => ({
  type: actionTypes.CHANGE_IS_BOOKMARK,
  data,
})
export const changeSpeakingIconBottom = (data) => ({
  type: actionTypes.CHANGE_SPEAKING_ICON_BOTTOM,
  data,
})
