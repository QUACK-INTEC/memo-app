import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createPromise } from 'redux-promise-middleware';
import reduxThunk from 'redux-thunk';
// import Config from 'react-native-config';
import { persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import userManagerReducer, { actionTypes as actionTypesUserManager } from './Common/UserManager';
import myClassesManager from './Common/MyClasses';

const rootReducer = combineReducers({
  userManager: userManagerReducer,
  MyClasses: myClassesManager,
});

function fnRootReducerInterceptor(objState, objAction) {
  if (objAction.type === actionTypesUserManager.LOG_OUT) {
    return rootReducer({}, objAction);
  }

  return rootReducer(objState, objAction);
}

const store = createStore(
  fnRootReducerInterceptor,
  composeWithDevTools(applyMiddleware(reduxThunk, createPromise()))
);

const startWithPersistStore = fnCallback => {
  persistStore(store, null, fnCallback);
  return store;
};

export { store as default, startWithPersistStore };
