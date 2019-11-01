import { createAction } from 'redux-actions';
import * as types from './ActionTypes';

export const setUserToken = createAction(types.SET_USER_TOKEN);
export const setUserInfo = createAction(types.SET_USER_INFO);
export const logout = createAction(types.LOG_OUT);
