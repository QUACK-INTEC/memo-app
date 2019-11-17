import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getMyClassesManager = objState => Lodash.get(objState, ['MyClasses'], {});

export const getMyClasses = createSelector(
  getMyClassesManager,
  objState => {
    return Lodash.get(objState, ['classes'], []);
  }
);

export default {
  getMyClasses,
};
