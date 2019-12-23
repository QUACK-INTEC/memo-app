import Lodash from 'lodash';

const getPostCommentsData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objClass => {
    const AuthorFirstName = Lodash.get(objClass, ['author', 'firstName'], ' ');
    const AuthorLastName = Lodash.get(objClass, ['author', 'lastName'], ' ');
    const AuthorFullName = Lodash.get(
      objClass,
      'authorFullName',
      `${AuthorFirstName} ${AuthorLastName}`
    );
    const authorId = Lodash.get(objClass, ['author', 'id'], ' ');
    const avatarURL = Lodash.get(objClass, 'avatarUri', null);
    const avatarUri = Lodash.get(objClass, ['author', 'avatarURL'], avatarURL);
    const BadgeUri = Lodash.get(objClass, ['author', 'rank', 'badgeUrl'], '');
    const currentUserReaction = Lodash.get(objClass, ['currentUserReaction'], 0);
    const authorInitials = Lodash.get(
      objClass,
      ['authorInitials'],
      `${AuthorFirstName[0]}${AuthorLastName[0]}`
    );
    const authorBadgeUri = Lodash.get(objClass, ['author', 'BadgeUri'], BadgeUri);

    return {
      ...objClass,
      authorFullName: AuthorFullName,
      authorBadgeUri,
      currentUserReaction,
      authorInitials,
      authorId,
      avatarUri,
    };
  });
};

const PostCommentList = {
  getPostCommentsData,
};

export default PostCommentList;
