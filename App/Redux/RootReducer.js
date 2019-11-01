import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createPromise } from 'redux-promise-middleware';
import reduxThunk from 'redux-thunk';
import Constants from 'expo-constants';
// import Config from 'react-native-config';
import { persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import userManagerReducer, { actionTypes as actionTypesUserManager } from './Common/UserManager';

const rootReducer = combineReducers({
  userManager: userManagerReducer,
});

const ipMatch = Constants.manifest.hostUri.match(/([0-9.]+):/)[1];

// eslint-disable-next-line no-undef
const composeEnhancers = composeWithDevTools({
  hostname: `${ipMatch ? ipMatch[1] : 'localhost'}:8082`,
});

function fnRootReducerInterceptor(objState, objAction) {
  if (objAction.type === actionTypesUserManager.LOG_OUT) {
    return rootReducer({}, objAction);
  }

  return rootReducer(objState, objAction);
}

const store = createStore(
  fnRootReducerInterceptor,
  composeEnhancers(applyMiddleware(reduxThunk, createPromise()))
);

const startWithPersistStore = fnCallback => {
  persistStore(store, null, fnCallback);
  return store;
};

export { store as default, startWithPersistStore };
