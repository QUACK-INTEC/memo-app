import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import * as types from './ActionTypes';

const initialState = {
  token: null,
  user: null,
  university: null,
};

// SET_USER_TOKEN
const onSetUserToken = (state, action) => {
  const userToken = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    token: userToken,
  };
};

// SET_USER_INFO
const onSetUserInfo = (state, action) => {
  const objPayloadUser = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    user: objPayloadUser,
  };
};

// SET_USER_INFO
const onSetUserUniversity = (state, action) => {
  const objPayloadUserUniversity = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    university: objPayloadUserUniversity,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_USER_TOKEN]: onSetUserToken,
    [types.SET_USER_INFO]: onSetUserInfo,
    [types.SET_USER_UNIVERSITY_SYNC]: onSetUserUniversity,
  },
  initialState
);

export default contentReducer;
