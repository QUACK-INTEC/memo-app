import Lodash from 'lodash';

const getSubTasksData = listData => {
  if (Lodash.isNull(listData) || listData.length === 0) {
    return [];
  }
  return listData.map(objSubTask => {
    const value = Lodash.get(objSubTask, ['id'], '');
    return {
      ...objSubTask,
      value,
    };
  });
};

const SubTasks = {
  getSubTasksData,
};

export default SubTasks;
