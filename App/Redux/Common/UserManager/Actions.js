import { createAction } from 'redux-actions';
import * as types from './ActionTypes';

export const setUserToken = createAction(types.SET_USER_TOKEN);
export const setUserInfo = createAction(types.SET_USER_INFO);
export const setUserSync = createAction(types.SET_USER_UNIVERSITY_SYNC);
export const logout = createAction(types.LOG_OUT);
export const setSyncRequired = createAction(types.SET_SYNC_REQUIRED);
