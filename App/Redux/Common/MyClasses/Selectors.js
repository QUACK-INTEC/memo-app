import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getMyClassesManager = objState => Lodash.get(objState, ['MyClasses'], {});
const getMyUserManager = objState => Lodash.get(objState, ['userManager'], {});

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

export const isLogged = createSelector(
  getMyUserManager,
  objState => {
    const value = Lodash.get(objState, ['token'], null);
    return value != null;
  }
);

export default {
  getMyClasses,
  getMyClassesLookup,
  isLogged,
};
