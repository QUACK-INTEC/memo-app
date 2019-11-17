import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import * as types from './ActionTypes';

const initialState = {
  classes: null,
};

// SET_MY_CLASSES
const onSetMyClasses = (state, action) => {
  const listMyClasses = Lodash.get(action, ['payload'], []);
  return {
    ...state,
    classes: listMyClasses,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_MY_CLASSES]: onSetMyClasses,
  },
  initialState
);

export default contentReducer;
