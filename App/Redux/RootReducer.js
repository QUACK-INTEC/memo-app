import { AsyncStorage } from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createPromise } from 'redux-promise-middleware';

// Reducers
import userManagerReducer, { actionTypes as actionTypesUserManager } from './Common/UserManager';
import myClassesManager from './Common/MyClasses';
import eventFormManagerReducer from '../Screens/EventForm/Redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userManager'],
};

const rootReducer = combineReducers({
  userManager: userManagerReducer,
  MyClasses: myClassesManager,
  EventForm: eventFormManagerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

function fnRootReducerInterceptor(objState, objAction) {
  if (objAction.type === actionTypesUserManager.LOG_OUT) {
    AsyncStorage.removeItem('persist:root');
    return persistedReducer({}, objAction);
  }
  return persistedReducer(objState, objAction);
}

export const store = createStore(
  fnRootReducerInterceptor,
  composeWithDevTools(applyMiddleware(reduxThunk, createPromise()))
);

export const persistor = persistStore(store);
