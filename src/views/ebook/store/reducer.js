import * as actionTypes from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
    fileName: '111'
})

export default (state = defaultState, action) => {
    switch (action.type) {
      case actionTypes.CHANGE_FILENAME:
        return state.set('fileName',action.data)
  
      default:
        return state
    }
  }