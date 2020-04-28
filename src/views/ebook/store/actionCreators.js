import * as actionTypes from './constants';
// import { fromJS } from 'immutable';

export const changeFileName = (data) => ({
    type:actionTypes.CHANGE_FILENAME,
    data
})

export const changeMenuVisible = (data) => ({
    type:actionTypes.CHANGE_MENUVISIBLE,
    data
})

export const changeSettingVisible = (data) => ({
    type:actionTypes.CHANGE_SETTINGVISIBLE,
    data
})