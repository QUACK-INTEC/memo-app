import Lodash from 'lodash';

const getPostCommentsData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objClass => {
    const AuthorFirstName = Lodash.get(objClass, ['author', 'firstName'], ' ');
    const AuthorLastName = Lodash.get(objClass, ['author', 'lastName'], ' ');
    const authorId = Lodash.get(objClass, ['author', 'id'], ' ');
    const avatarUri = Lodash.get(objClass, ['author', 'avatarURL'], null);
    const authorBadgeUri = Lodash.get(
      objClass,
      ['author', 'badgeURL'],
      'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png'
    );
    const currentUserReaction = Lodash.get(objClass, ['currentUserReaction'], 0);

    return {
      ...objClass,
      author: `${AuthorFirstName} ${AuthorLastName}`,
      authorBadgeUri,
      currentUserReaction,
      authorInitials: `${AuthorFirstName[0]}${AuthorLastName[0]}`,
      authorId,
      avatarUri,
    };
  });
};

const PostCommentList = {
  getPostCommentsData,
};

export default PostCommentList;
