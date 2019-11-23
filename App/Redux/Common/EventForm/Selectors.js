import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getMyUserManager = objState => Lodash.get(objState, ['userManager'], {});

export const isLogged = createSelector(
  getMyUserManager,
  objState => {
    const value = Lodash.get(objState, ['token'], null);
    return value != null;
  }
);

export const getUserToken = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['token'], null);
  }
);

export default {
  isLogged,
  getUserToken,
};
