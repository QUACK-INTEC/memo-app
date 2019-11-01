// import { createSelector } from 'reselect';
// import { get } from '../../../Utilities';

// const getUserManagerState = objState => get(objState, ['userManager'], {});

// export const getUserToken = createSelector(
//   getUserManagerState,
//   objState => {
//     return get(objState, ['token'], null);
//   }
// );

// export const isUserLoggedIn = createSelector(
//   getUserToken,
//   strToken => {
//     return !!strToken;
//   }
// );

// export const getUserInfo = createSelector(
//   getUserManagerState,
//   objState => get(objState, ['user'], null)
// );

// export const getUserSfId = createSelector(
//   getUserInfo,
//   objUser => get(objUser, ['sfId'], null)
// );

// export const getUserLocationSfId = createSelector(
//   getUserInfo,
//   objUser => get(objUser, ['primaryLocationSfId'], null)
// );

// export default {
//   getUserInfo,
//   getUserToken,
//   getUserSfId,
//   getUserLocationSfId,
//   isUserLoggedIn,
// };
