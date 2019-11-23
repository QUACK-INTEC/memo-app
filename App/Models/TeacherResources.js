import Lodash from 'lodash';

const getResourcesData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objTeacher => {
    const teacherFirstName = Lodash.get(objTeacher, ['teacherName'], ' ');
    return {
      ...objTeacher,
      teacherFirstName: teacherFirstName.split(' ')[0],
    };
  });
};

const TeacherResources = {
  getResourcesData,
};

export default TeacherResources;
