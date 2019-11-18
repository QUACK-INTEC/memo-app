import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import * as types from './ActionTypes';

const initialState = {
  postComments: null,
};

// SET_MY_CLASSES
const onSetPostComments = (state, action) => {
  const listPostComments = Lodash.get(action, ['payload'], []);
  return {
    ...state,
    postComments: listPostComments,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_POST_COMMENTS]: onSetPostComments,
  },
  initialState
);

export default contentReducer;
