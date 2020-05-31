import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  isEditMode: false,
  bookList: [],
  selectedList: [],
  scrollBottom: 0,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_IS_EDIT_MODE:
      return state.set('isEditMode', action.data)
    case actionTypes.CHANGE_BOOK_LIST:
      return state.set('bookList', action.data)
    case actionTypes.CHANGE_SELECTED_LIST:
      return state.set('selectedList', action.data)
    case actionTypes.CHANGE_SCROLL_BOTTOM:
      return state.set('scrollBottom', action.data)
    default:
      return state
  }
}
