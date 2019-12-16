import Lodash from 'lodash';
import Moment from 'moment';
import { toUpperCaseFirsLetter } from '../Utils';

const getClassesData = (listData = []) => {
  const listClasses = listData.map(objClass => {
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

  const listClassesOrdered = Lodash.orderBy(listClasses, ['from'], ['asc']);
  return listClassesOrdered;
};

const getEventsData = (listData = []) => {
  const listEvents = listData.map(objEvent => {
    const objAuthor = Lodash.get(objEvent, ['author'], {});
    const strFirstName = Lodash.get(objAuthor, ['firstName'], '');
    const strLastName = Lodash.get(objAuthor, ['lastName'], '');
    const strAvatarURL = Lodash.get(objAuthor, ['avatarURL'], '');
    const objSubject = Lodash.get(objEvent, ['section', 'subject'], {});
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
    const startTimeStamp = Moment(startDate).unix();

    console.log({ objEvent });
    return {
      ...objEvent,
      startTimeStamp,
      name: `${strFirstName} ${strLastName}`,
      avatarURL: strAvatarURL,
      subject: toUpperCaseFirsLetter(strSubjectName),
      title: strTitle,
      author: strAuthorName,
      time: strTimeEvent,
    };
  });
  const listEventsOrdered = Lodash.orderBy(listEvents, ['startTimeStamp'], ['asc']);
  return listEventsOrdered;
};

const Events = {
  getEventsData,
  getClassesData,
};

export default Events;
