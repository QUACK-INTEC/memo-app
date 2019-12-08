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

export const getMyClassesString = createSelector(
  getMyClassesManager,
  objState => {
    const Clases = Lodash.get(objState, ['classes', 'entities', 'classes'], {});
    return Object.keys(Clases)
      .map(key => Clases[key].subject.name)
      .join(', ');
  }
);

export default {
  getMyClasses,
  getMyClassesLookup,
  getMyClassesString,
};
