import { combineReducers } from 'redux-immutable'
import { reducer as ebookReducer } from '@/views/ebook/store'
import { reducer as bookHomeReducer } from '@/views/store/components/home/store'

export default combineReducers({
  ebook: ebookReducer,
  bookHome: bookHomeReducer,
})
