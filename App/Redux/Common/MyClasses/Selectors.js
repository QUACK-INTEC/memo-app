import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getMyClassesManager = objState => Lodash.get(objState, ['MyClasses'], {});

export const getMyClassesLookup = createSelector(
  getMyClassesManager,
  objState => {
    return Lodash.get(objState, ['classes', 'entities', 'classes'], {});
  }
);

export const getMyClasses = createSelector(
  getMyClassesManager,
  objState => {
    return Lodash.get(objState, ['classes', 'result'], []);
  }
);

export default {
  getMyClasses,
  getMyClassesLookup,
};
