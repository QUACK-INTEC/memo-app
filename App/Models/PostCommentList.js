import Lodash from 'lodash';

const getPostCommentsData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objClass => {
    return {
      ...objClass,
    };
  });
};

const PostCommentList = {
  getPostCommentsData,
};

export default PostCommentList;
