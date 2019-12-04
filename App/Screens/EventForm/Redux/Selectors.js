import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getEventForm = objState => Lodash.get(objState, ['EventForm'], {});

export const getIsModalVisible = createSelector(
  getEventForm,
  objState => {
    return Lodash.get(objState, ['isModalVisible'], false);
  }
);

export const getInitialsValue = createSelector(
  getEventForm,
  objState => {
    return Lodash.get(objState, ['values'], {});
  }
);
export const getIsEditingForm = createSelector(
  getEventForm,
  objState => {
    return Lodash.get(objState, ['isEditing'], false);
  }
);

export default {
  getIsModalVisible,
  getInitialsValue,
  getIsEditingForm,
};
