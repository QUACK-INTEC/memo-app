import typeToReducer from 'type-to-reducer';
import Lodash from 'lodash';
import { normalize, schema } from 'normalizr';

import * as types from './ActionTypes';

const initialState = {
  classes: null,
};

// SET_MY_CLASSES
const onSetMyClasses = (state, action) => {
  const listClassesPayload = Lodash.get(action, ['payload'], []);
  const classesSchema = new schema.Entity('classes', {}, { idAttribute: 'id' });
  const listClasses = new schema.Array(classesSchema);
  const listClassesNormalized = normalize(listClassesPayload, listClasses);

  return {
    ...state,
    classes: listClassesNormalized,
  };
};

const contentReducer = typeToReducer(
  {
    [types.SET_MY_CLASSES]: onSetMyClasses,
  },
  initialState
);

export default contentReducer;
