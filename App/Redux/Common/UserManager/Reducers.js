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
// LOG_OUT
const onSetLogout = () => {
  return {
    token: null,
    user: null,
    university: null,
  };
};

// SET_SYNC_REQUIRED
const onSetSyncRequired = (state, action) => {
  const required = Lodash.get(action, ['payload'], '');
  return {
    ...state,
    isSyncRequired: required,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_USER_TOKEN]: onSetUserToken,
    [types.SET_USER_INFO]: onSetUserInfo,
    [types.SET_USER_UNIVERSITY_SYNC]: onSetUserUniversity,
    [types.LOG_OUT]: onSetLogout,
    [types.SET_SYNC_REQUIRED]: onSetSyncRequired,
  },
  initialState
);

export default contentReducer;
