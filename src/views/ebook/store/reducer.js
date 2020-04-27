import * as actionTypes from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
    fileName: '',
    menuVisible: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
      case actionTypes.CHANGE_FILENAME:
        return state.set('fileName',action.data)
        case actionTypes.CHANGE_MENUVISIBLE:
          return state.set('menuVisible',action.data)
      default:
        return state
    }
  }