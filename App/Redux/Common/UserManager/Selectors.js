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

export const getUserId = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'id'], null);
  }
);

export const getFirstName = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'firstName'], null);
  }
);

export const getLastName = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'lastName'], null);
  }
);

export const getAvatarUser = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'avatarURL'], null);
  }
);
export const getEmail = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'email'], null);
  }
);

export default {
  getEmail,
  getAvatarUser,
  getLastName,
  getFirstName,
  isLogged,
  getUserId,
  getUserToken,
};
