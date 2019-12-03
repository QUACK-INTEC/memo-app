import Lodash from 'lodash';

const getSubTasksData = listData => {
  if (Lodash.isNull(listData) || listData.length === 0) {
    return [];
  }
  return listData.map(objSubTask => {
    const value = Lodash.get(objSubTask, ['id'], '');
    const label = Lodash.get(objSubTask, ['name'], '');
    const done = Lodash.get(objSubTask, ['isDone'], '');
    return {
      ...objSubTask,
      value,
      label,
      done,
    };
  });
};

const SubTasks = {
  getSubTasksData,
};

export default SubTasks;
