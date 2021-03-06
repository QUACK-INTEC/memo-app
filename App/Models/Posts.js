import Lodash from 'lodash';
import Moment from 'moment';

const getPostData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  const listPosts = listData.map(objPost => {
    const firstName = Lodash.get(objPost, ['author', 'firstName'], '');
    const lastName = Lodash.get(objPost, ['author', 'lastName'], '');
    const createdAt = Lodash.get(objPost, ['createdAt'], null);
    const createdSince = Moment().diff(createdAt, 'days');

    return {
      ...objPost,
      postedBy: `${firstName} ${lastName}`,
      authorInitials: `${firstName[0]}${lastName[0]}`,
      createdSince,
      timestampCreated: Moment(createdAt).unix(),
    };
  });
  return Lodash.orderBy(listPosts, ['timestampCreated'], ['asc']);
};

const Posts = {
  getPostData,
};

export default Posts;
