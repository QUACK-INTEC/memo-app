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
export const getPoints = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'points'], 0);
  }
);
export const getRank = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'rank'], 'unranked');
  }
);

export const getRankName = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'rank', 'name'], '');
  }
);

export const getBadgeUrl = createSelector(
  getMyUserManager,
  objState => {
    return Lodash.get(objState, ['user', 'rank', 'badgeUrl'], '');
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
  getPoints,
  getRank,
  getRankName,
  getBadgeUrl,
};
