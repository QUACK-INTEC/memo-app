import Lodash from 'lodash';

const getPostData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objPost => {
    const firstName = Lodash.get(objPost, ['author', 'firstName'], '');
    const lastName = Lodash.get(objPost, ['author', 'firstName'], '');

    return {
      ...objPost,
      postedBy: `${firstName} ${lastName}`,
    };
  });
};

const Posts = {
  getPostData,
};

export default Posts;
