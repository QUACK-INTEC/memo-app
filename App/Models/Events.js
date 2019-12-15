import Lodash from 'lodash';
import Moment from 'moment';
import { toUpperCaseFirsLetter } from '../Utils';

const getClassesData = (listData = []) => {
  return listData.map(objClass => {
    const objSchedule = Lodash.get(objClass, ['schedule'], {});
    const objSubject = Lodash.get(objClass, ['subject'], {});
    const intFrom = Lodash.get(objSchedule, ['from'], 0);
    const intTo = Lodash.get(objSchedule, ['to'], 0);
    const strSubjectName = Lodash.get(objSubject, ['name'], '');
    const strFromFormatted = Moment.unix(intFrom / 1000).format('HH:mm');
    const strToFormatted = Moment.unix(intTo / 1000).format('HH:mm');
    const strSeparator = intFrom && intTo ? '-' : '';
    const strSchedule = `${strFromFormatted} ${strSeparator} ${strToFormatted}`;

    return {
      ...objClass,
      schedule: strSchedule,
      name: toUpperCaseFirsLetter(strSubjectName),
    };
  });
};

const getEventsData = (listData = []) => {
  return listData.map(objEvent => {
    const objAuthor = Lodash.get(objEvent, ['author'], {});
    const objSubject = Lodash.get(objEvent, ['subject'], {});
    const strSubjectName = Lodash.get(objSubject, ['name'], '');
    const strAuthorName = Lodash.get(objAuthor, ['name'], '');
    const strTitle = Lodash.get(objEvent, ['title'], '');
    const startDate = Lodash.get(objEvent, ['startDate'], null);
    const endDate = Lodash.get(objEvent, ['endDate'], null);
    const startDateFormatted = Moment(startDate)
      .utc()
      .format('HH:mm');
    const endDateFormatted = Moment(endDate)
      .utc()
      .format('HH:mm');
    const strSeparator = startDate && endDate ? '-' : '';
    const strTimeEvent = `${startDateFormatted} ${strSeparator} ${endDateFormatted}`;

    return {
      ...objEvent,
      subject: toUpperCaseFirsLetter(strSubjectName),
      title: strTitle,
      author: strAuthorName,
      time: strTimeEvent,
    };
  });
};

const Events = {
  getEventsData,
  getClassesData,
};

export default Events;
