import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getPostCommentsManager = objState => Lodash.get(objState, ['PostComments'], {});

export const getPostComments = createSelector(
  getPostCommentsManager,
  objState => {
    return Lodash.get(objState, ['postComments'], []);
  }
);

export default {
  getPostComments,
};
