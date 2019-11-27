import Lodash from 'lodash';

const getPostData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objPost => {
    const firstName = Lodash.get(objPost, ['author', 'firstName'], '');
    const lastName = Lodash.get(objPost, ['author', 'lastName'], '');

    return {
      ...objPost,
      postedBy: `${firstName} ${lastName}`,
      authorInitials: `${firstName[0]}${lastName[0]}`,
    };
  });
};

const Posts = {
  getPostData,
};

export default Posts;
