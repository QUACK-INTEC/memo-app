/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import * as types from './ActionTypes';

export const setPostComments = createAction(types.SET_POST_COMMENTS);
