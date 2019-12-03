import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Moment from 'moment';

import EventFormComponent from '../../Components/EventForm';
import { selectors as EventFormSelectors, actions as EventFormActions } from './Redux';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import { Classes } from '../../Models';
import Api from '../../Core/Api';
import PopUp from '../../Components/Common/PopUp';

const validation = objValues => {
  const errors = {};
  const { section, description, title, endDate, startDate } = objValues;

  if (!title) {
    errors.title = 'Campo obligatorio';
  }

  if (!description) {
    errors.description = 'Campo obligatorio';
  }

  if (!section) {
    errors.section = 'Campo obligatorio';
  }

  if (endDate && !startDate) {
    errors.startDate = 'Necesita una fecha';
  }

  if (startDate && !endDate) {
    errors.endDate = 'Necesita una fecha';
  }

  return errors;
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationPopupVisible: false,
      confirmationPopupMessage: null,
    };
  }

  getInitialsValue = () => {
    const { initialsValue } = this.props;
    return {
      section: null,
      description: null,
      endDate: null,
      dateTime: new Date(),
      startDate: null,
      title: null,
      type: 'public',
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
      startDate: startTime ? startDate : null,
      endDate: endTime ? endDate : null,
      section,
      type: endTime && startTime ? 'Event' : 'Resource',
      isPublic: type === 'public',
    };
    return isEditing ? this.handleEditPost(postId, objPayload) : this.handleCreatePost(objPayload);
  };

  handleCreatePost = objPayload => {
    const { setModalVisible, logger, MessagesKey } = this.props;
    return Api.CreatePost(objPayload)
      .then(objResponse => {
        setModalVisible(false);
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
          validation={validation}
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
