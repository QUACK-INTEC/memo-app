import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import * as types from './ActionTypes';

const initialState = {
  token: null,
  user: null,
};

// SET_USER_TOKEN
const onSetUserToken = (state, action) => {
  const userToken = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    token: userToken,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_USER_TOKEN]: onSetUserToken,
  },
  initialState
);

export default contentReducer;
