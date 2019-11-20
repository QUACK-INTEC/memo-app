import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getMyUserManager = objState => Lodash.get(objState, ['userManager'], {});

export const isLogged = createSelector(
  getMyUserManager,
  objState => {
    const value = Lodash.get(objState, ['user', 'token'], null);

    console.log('RED', value);
    return value != null;
  }
);

export default {
  isLogged,
};
