import { createAction } from 'redux-actions';
import * as types from './ActionTypes';

export const setInitialFormValues = createAction(types.SET_INITIAL_FORM_VALUES);
export const setModalVisible = createAction(types.SET_MODAL_VISIBLE);
