import { combineReducers } from 'redux-immutable'
import { reducer as ebookReducer} from '../views/ebook/store'

export default combineReducers({
  ebook:ebookReducer
})
