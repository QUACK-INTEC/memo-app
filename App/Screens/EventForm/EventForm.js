import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Lodash from 'lodash';

import EventFormComponent from '../../Components/EventForm';
import { selectors as EventFormSelectors, actions as EventFormActions } from './Redux';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import { Classes } from '../../Models';
import Api from '../../Core/Api';
import PopUp from '../../Components/Common/PopUp';

import { GAMIFICATION_MSG } from '../../Utils';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopupVisible: false,
      confirmationPopupMessage: null,
    };
  }

  getValidation = objValues => {
    const errors = {};
    const section = Lodash.get(objValues, ['section'], null);
    const description = Lodash.get(objValues, ['description'], null);
    const title = Lodash.get(objValues, ['title'], null);
    const endDate = Lodash.get(objValues, ['endDate'], null);
    const startDate = Lodash.get(objValues, ['startDate'], null);
    const hasDate = Lodash.get(objValues, ['hasDate'], null);
    const hasFile = Lodash.get(objValues, ['hasFile'], null);
    const attachments = Lodash.get(objValues, ['attachments'], null);

    if (!title) {
      errors.title = 'Campo obligatorio';
    }

    if (!description) {
      errors.description = 'Campo obligatorio';
    }

    if (!section) {
      errors.section = 'Campo obligatorio';
    }

    if (hasDate) {
      if (!endDate || !startDate) {
        errors.startDate = 'Necesita una fecha';
        errors.endDate = 'Necesita una fecha';
      }
    }

    if (hasFile) {
      if (attachments && attachments.length <= 0) {
        errors.attachments = 'Necesita almenos un documento';
      }
    }

    return errors;
  };

  getInitialsValue = () => {
    const { initialsValue } = this.props;
    const startDate = Lodash.get(initialsValue, ['startDate'], null);
    const endDate = Lodash.get(initialsValue, ['endDate'], null);

    return {
      section: null,
      description: null,
      endDate: null,
      dateTime: new Date(),
      startDate: null,
      title: null,
      type: 'public',
      hasFile: false,
      hasDate: startDate && endDate,
      attachments: [],
      ...initialsValue,
    };
  };

  getMyClassesOptions = () => {
    const { myClasses, myClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);
    return myClassesFormatted.map(objClass => {
      return {
        value: objClass.id,
        label: objClass.subjectName,
      };
    });
  };

  goBack = () => {
    this.setState({
      confirmationPopupVisible: false,
    });
  };

  handleOnCloseModal = () => {
    const { setModalVisible, setInitialFormValues, isEditing, setEditingModal } = this.props;
    setInitialFormValues({
      section: null,
      description: null,
      endDate: null,
      dateTime: new Date(),
      startDate: null,
      title: null,
      attachments: [],
      type: 'public',
    });
    if (isEditing) {
      setEditingModal(false);
    }
    setModalVisible(false);
  };

  changeTimezone = date => {
    const invdate = new Date(
      date.toLocaleString('en-US', {
        timeZone: 'America/Santo_Domingo',
      })
    );
    const diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() + diff);
  };

  handleOnSubmitForm = objValues => {
    const { isEditing } = this.props;

    const {
      section,
      description,
      endDate: endTime,
      dateTime,
      startDate: startTime,
      title,
      type,
      postId,
      hasDate,
    } = objValues;
    const momentDateSelected = Moment(dateTime);
    const momentStartTime = Moment(startTime);
    const momentEndTime = Moment(endTime);

    const startDate = new Date(
      Date.UTC(
        momentDateSelected.year(),
        momentDateSelected.month(),
        momentDateSelected.date(),
        momentStartTime.hours(),
        momentStartTime.minutes(),
        0
      )
    ).getTime();

    const endDate = new Date(
      Date.UTC(
        momentDateSelected.year(),
        momentDateSelected.month(),
        momentDateSelected.date(),
        momentEndTime.hours(),
        momentEndTime.minutes(),
        0
      )
    ).getTime();

    const objPayload = {
      title,
      description,
      startDate: hasDate ? startDate : null,
      endDate: hasDate ? endDate : null,
      section,
      type: endTime && startTime ? 'Event' : 'Resource',
      isPublic: type === 'public',
    };
    return isEditing ? this.handleEditPost(postId, objPayload) : this.handleCreatePost(objPayload);
  };

  handleCreatePost = objPayload => {
    const { setModalVisible, logger, MessagesKey, toastRef } = this.props;

    const current = Lodash.get(toastRef, ['current'], null);
    return Api.CreatePost(objPayload)
      .then(objResponse => {
        setModalVisible(false);

        current.setToastVisible(GAMIFICATION_MSG(50));
        setTimeout(() => {
          this.setState({
            confirmationPopupMessage: 'Publicación creada exitosamente',
            confirmationPopupVisible: true,
          });
        }, 800);
        return logger.success({
          key: MessagesKey.CREATE_POST_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CREATE_POST_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  handleEditPost = (idPost, objPayload) => {
    const { logger, MessagesKey, setModalVisible } = this.props;
    return Api.EditPost(idPost, objPayload)
      .then(objResponse => {
        setModalVisible(false);
        return logger.success({
          key: MessagesKey.EDIT_POST_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.EDIT_POST_SUCCESS,
            data: objError,
          });
        }, 800);
      });
  };

  renderEventForm = () => {
    const { confirmationPopupVisible, confirmationPopupMessage } = this.state;
    const { isModalVisible, isEditing } = this.props;

    if (confirmationPopupVisible) {
      return (
        <PopUp.Info
          title={confirmationPopupMessage}
          buttonText="OK"
          onButtonPress={this.goBack}
          isVisible={confirmationPopupVisible}
        />
      );
    }

    if (!isModalVisible) {
      return null;
    }

    return (
      <>
        <EventFormComponent
          onCloseModal={this.handleOnCloseModal}
          isVisible={isModalVisible}
          onSubmit={this.handleOnSubmitForm}
          initialValues={this.getInitialsValue()}
          validation={this.getValidation}
          isEditing={isEditing}
          optionsClasses={this.getMyClassesOptions()}
        />
      </>
    );
  };

  render() {
    return this.renderEventForm();
  }
}

EventForm.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  setInitialFormValues: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  myClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  myClassesLookup: PropTypes.shape({}).isRequired,
  isEditing: PropTypes.bool.isRequired,
  setEditingModal: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => {
  const { getIsModalVisible, getInitialsValue, getIsEditingForm } = EventFormSelectors;
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;

  return {
    isModalVisible: getIsModalVisible(state, props),
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
    initialsValue: getInitialsValue(state, props),
    isEditing: getIsEditingForm(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModalVisible: EventFormActions.setModalVisible,
      setInitialFormValues: EventFormActions.setInitialFormValues,
      setEditingModal: EventFormActions.setEditingModal,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
