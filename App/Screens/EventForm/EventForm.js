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
      isSubmiting: false,
    };
  }

  getValidation = objValues => {
    const errors = {};
    const section = Lodash.get(objValues, ['section'], null);
    const title = Lodash.get(objValues, ['title'], null);
    const endDate = Lodash.get(objValues, ['endDate'], null);
    const startDate = Lodash.get(objValues, ['startDate'], null);
    const hasDate = Lodash.get(objValues, ['hasDate'], null);
    const hasFile = Lodash.get(objValues, ['hasFile'], null);
    const attachments = Lodash.get(objValues, ['attachments'], null);

    if (!title) {
      errors.title = 'Campo obligatorio';
    }

    if (!section) {
      errors.section = 'Campo obligatorio';
    }

    if (hasDate) {
      if (startDate > endDate) {
        errors.dateTime = 'La fecha debe ser menor a la fecha final';
      }
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

  formatAttachmentData = data => {
    const newData = data.map(x => {
      const name = x.name.split('.');
      const [alias, extension] = name;
      const item = {};
      item.id = x.id;
      item.name = x.name;
      item.fileURL = x.fileURL;
      item.title = x.name;
      item.type = '';
      item.extension = extension || '';
      item.alias = alias;
      return item;
    });
    return newData;
  };

  getInitialsValue = () => {
    const { initialsValue } = this.props;
    const startDate = Lodash.get(initialsValue, ['startDate'], null);
    const endDate = Lodash.get(initialsValue, ['endDate'], null);
    const attachments = Lodash.get(initialsValue, ['attachments'], []);
    return {
      section: null,
      description: null,
      endDate: null,
      dateTime: new Date().setHours(7),
      startDate: null,
      title: null,
      type: 'public',
      hasFile: attachments.length > 0,
      hasDate: startDate && endDate,
      ...initialsValue,
      attachments: this.formatAttachmentData(attachments),
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
      dateTime: new Date().setHours(7),
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

  handleOnSubmitForm = objValues => {
    const { isEditing } = this.props;
    const { logger, MessagesKey } = this.props;

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
      attachments,
    } = objValues;

    const momentDateSelected =
      dateTime instanceof Date
        ? Moment(new Date(dateTime.getTime() + dateTime.getTimezoneOffset() * 60 * 1000))
        : Moment(dateTime);
    const momentStartTime = Moment(startTime);
    const momentEndTime = Moment(endTime);
    this.setState({ isSubmiting: true });
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

    const listUpload = [];
    attachments.map(objFile => {
      if (Lodash.isNull(objFile.id)) {
        listUpload.push(objFile);
      }
      return null;
    });

    const attchKeys = [];
    attachments.map(att => {
      if (!Lodash.isNull(att.id)) {
        attchKeys.push(att.id);
      }
      return null;
    });
    const objPayload = {
      title,
      description,
      startDate: hasDate ? startDate : null,
      endDate: hasDate ? endDate : null,
      section,
      type: hasDate ? 'Event' : 'Resource',
      isPublic: type === 'public',
      attachments: attchKeys,
    };

    if (!Lodash.isEmpty(listUpload)) {
      return Api.UploadFile(listUpload)
        .then(objResponse => {
          const newAttachments = Lodash.get(objResponse, ['data', 'attachments'], []).map(file => {
            if (!Lodash.isNull(file.id)) {
              return file.id;
            }
            return null;
          });

          objPayload.attachments = objPayload.attachments.concat(newAttachments);

          return isEditing
            ? this.handleEditPost(postId, objPayload)
            : this.handleCreatePost(objPayload);
        })
        .catch(objError => {
          this.setState({ isSubmiting: false });

          return setTimeout(() => {
            logger.error({
              key: MessagesKey.CREATE_POST_FAILED,
              data: objError,
            });
          }, 800);
        });
    }
    return isEditing ? this.handleEditPost(postId, objPayload) : this.handleCreatePost(objPayload);
  };

  handleCreatePost = objPayload => {
    const { logger, MessagesKey, toastRef } = this.props;

    const current = Lodash.get(toastRef, ['current'], null);
    return Api.CreatePost(objPayload)
      .then(objResponse => {
        current.setToastVisible(GAMIFICATION_MSG(50));
        this.handleOnCloseModal();
        this.setState({ isSubmiting: false });

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
        this.handleOnCloseModal();
        this.setState({ isSubmiting: false });

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CREATE_POST_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  handleEditPost = (idPost, objPayload) => {
    const { logger, MessagesKey } = this.props;
    return Api.EditPost(idPost, objPayload)
      .then(objResponse => {
        this.handleOnCloseModal();
        this.setState({ isSubmiting: false });
        return logger.success({
          key: MessagesKey.EDIT_POST_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isSubmiting: false });

        this.handleOnCloseModal();
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.EDIT_POST_SUCCESS,
            data: objError,
          });
        }, 800);
      });
  };

  renderEventForm = () => {
    const { confirmationPopupVisible, confirmationPopupMessage, isSubmiting } = this.state;
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
          isSubmiting={isSubmiting}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
