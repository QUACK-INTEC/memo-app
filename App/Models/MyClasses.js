import Lodash from 'lodash';
import { toUpperCaseFirsLetter } from '../Utils';

const getMyClassesData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }

  return listData.map(objClass => {
    const classDays = Object.keys(objClass.schedule).map(toUpperCaseFirsLetter);
    return {
      ...objClass,
      classDays: Lodash.isEmpty(classDays) ? 'VT' : classDays.join(','),
      professorName: toUpperCaseFirsLetter(objClass.professorName),
    };
  });
};

const MyClasses = {
  getMyClassesData,
};

export default MyClasses;
