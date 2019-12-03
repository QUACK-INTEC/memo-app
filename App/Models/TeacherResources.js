import Lodash from 'lodash';

const getTeachersData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objTeacher => {
    const teacherFirstName = Lodash.get(objTeacher, ['teacherName'], ' ');
    const resources = Lodash.get(objTeacher, ['resources'], []);
    return {
      ...objTeacher,
      teacherFirstName: teacherFirstName.split(' ')[0],
      resources,
    };
  });
};

const getResourcesData = listData => {
  if (Lodash.isNull(listData)) {
    return [];
  }
  return listData.map(objResource => {
    return {
      ...objResource,
    };
  });
};

const TeacherResources = {
  getResourcesData,
  getTeachersData,
};

export default TeacherResources;
