import * as actionTypes from './constants'
import { fromJS } from 'immutable'

export const changeShowFlapCard = (data) => ({
  type: actionTypes.CHANGE_SHOW_FLAP_CARD,
  data,
})

export const changeRandom = (data) => ({
  type: actionTypes.CHANGE_RANDOM,
  data: fromJS(data),
})
