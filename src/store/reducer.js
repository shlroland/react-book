import { combineReducers } from 'redux-immutable'
import { reducer as ebookReducer } from '@/views/ebook/store'
import { reducer as bookHomeReducer } from '@/views/store/components/home/store'
import { reducer as bookShelfReducer } from '@/views/store/components/shelf/store'
import { reducer as bookCategoryReducer } from '@/views/store/components/category/store'


export default combineReducers({
  ebook: ebookReducer,
  bookHome: bookHomeReducer,
  bookShelf: bookShelfReducer,
  bookCategory: bookCategoryReducer
})
