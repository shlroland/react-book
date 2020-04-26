import * as actionTypes from './constants';
// import { fromJS } from 'immutable';

export const changeFileName = (data) => ({
    type:actionTypes.CHANGE_FILENAME,
    data
})