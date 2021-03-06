import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import * as types from './ActionTypes';

const initialState = {
  isModalVisible: false,
  isEditing: false,
  values: {
    clase: null,
    title: null,
    description: null,
    type: 'public',
    startTime: null,
    endTime: null,
    section: null,
    attachments: [],
  },
};

// TODO: Set modal visible in hoc to display the modal, dispatch action from the tab bar

// SET_INITIAL_FORM_VALUES
const onSetInitialValues = (state, action) => {
  const objInitialValues = Lodash.get(action, ['payload'], initialState.values);
  return {
    ...state,
    values: {
      ...objInitialValues,
    },
  };
};

// SET_MODAL_VISIBLE
const onSetModalVisible = (state, action) => {
  const isModalVisible = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    isModalVisible,
  };
};
// SET_MODAL_EDITING
const onSetModalEditing = (state, action) => {
  const isFormEditing = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    isEditing: isFormEditing,
  };
};
const contentReducer = typeToReducer(
  {
    [types.SET_INITIAL_FORM_VALUES]: onSetInitialValues,
    [types.SET_MODAL_VISIBLE]: onSetModalVisible,
    [types.SET_MODAL_EDITING]: onSetModalEditing,
  },
  initialState
);

export default contentReducer;
