import Lodash from 'lodash';

const getParticipantsData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objParticipant => {
    const FirstName = Lodash.get(objParticipant, ['firstName'], ' ');
    const LastName = Lodash.get(objParticipant, ['lastName'], ' ');
    return {
      ...objParticipant,
      fullName: `${FirstName} ${LastName}`,
      avatarUri: Lodash.get(objParticipant, ['avatarURL'], null),
      initials: `${FirstName[0]}${LastName[0]}`,
      badgeUri: Lodash.get(objParticipant, ['rank', 'badgeUrl'], ''),
    };
  });
};

const Participants = {
  getParticipantsData,
};

export default Participants;
