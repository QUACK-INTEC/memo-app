/* eslint-disable func-names */
import Lodash from 'lodash';
import { toUpperCaseFirsLetter } from '../Utils';

const daysInSpanish = {
  sunday: 'Domingo',
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miercoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sabado',
};

const getClassesData = (listId, objLookUp) => {
  if (Lodash.isNull(listId)) {
    return [];
  }

  return listId.map(strId => {
    const objScheduleClone = Lodash.cloneDeep(objLookUp[strId].schedule);
    Object.keys(objScheduleClone).forEach(function(key) {
      const newkey = daysInSpanish[key];
      objScheduleClone[newkey] = objScheduleClone[key];
      delete objScheduleClone[key];
    });
    const classDays = Object.keys(objScheduleClone);
    const subjectName = Lodash.get(objLookUp[strId], ['subject', 'name'], '');
    return {
      ...objLookUp[strId],
      classDays: Lodash.isEmpty(classDays) ? 'VT' : classDays.join(', '),
      schedule: objScheduleClone,
      subjectName: toUpperCaseFirsLetter(Lodash.replace(subjectName, 'LABORATORIO', 'LAB.')),
      professorName: toUpperCaseFirsLetter(objLookUp[strId].professorName),
    };
  });
};

const MyClasses = {
  getClassesData,
};

export default MyClasses;
