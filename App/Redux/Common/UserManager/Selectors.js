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

export const getUser = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user'], null);
  }
);

export const getUserFirstName = createSelector(
  getUser,
  objState => {
    return Lodash.get(objState, ['firstName'], null);
  }
);

export const getUserLastName = createSelector(
  getUser,
  objState => {
    return Lodash.get(objState, ['lastName'], null);
  }
);

export default {
  getUser,
  getUserFirstName,
  getUserLastName,
  isLogged,
  getUserToken,
};
