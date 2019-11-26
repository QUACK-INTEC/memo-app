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

const validation = objValues => {
  const errors = {};
  const { section, description, title } = objValues;

  if (!title) {
    errors.title = 'Campo obligatorio';
  }

  if (!description) {
    errors.description = 'Campo obligatorio';
  }

  if (!section) {
    errors.section = 'Campo obligatorio';
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
    const { setModalVisible } = this.props;
    setModalVisible(false);
  };

  handleOnSubmitForm = objValues => {
    const { initialsValue } = this.props;

    // TODO: Implement attachments when is ready
    const {
      section,
      description,
      endDate: endTime,
      dateTime,
      startDate: startTime,
      title,
      type,
    } = objValues;
    const momentDateSelected = Moment(dateTime);
    const momentStartTime = Moment(startTime);
    const momentEndTime = Moment(endTime);

    const startDate = momentDateSelected
      .set({
        hour: momentStartTime.hours(),
        minutes: momentStartTime.minutes(),
        seconds: 0,
        miliseconds: 0,
      })
      .unix();
    const endDate = momentDateSelected
      .set({
        hour: momentEndTime.hours(),
        minutes: momentEndTime.minutes(),
        seconds: 0,
        miliseconds: 0,
      })
      .unix();

    const objPayload = {
      title,
      description,
      startDate,
      endDate,
      section,
      type: 'Event',
      isPublic: type === 'public',
    };

    const oldTitle = Lodash.get(initialsValue, ['title'], null);

    return oldTitle ? this.handleEditPost(objPayload) : this.handleCreatePost(objPayload);
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

  handleEditPost = () => {
    // TODO: Add logger, get id from post to edit
    // return Api.EditPost(objPayload).then(objResponse => {
    //   console.log({objResponse})
    //   this.setState({ confirmationPopupVisible: true})
    // }).catch( objError => {
    //   console.log({objError})
    // })
  };

  renderEventForm = () => {
    const { confirmationPopupVisible, confirmationPopupMessage } = this.state;
    const { isModalVisible } = this.props;

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
          isEditing={false}
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
  isModalVisible: PropTypes.bool.isRequired,
  myClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  myClassesLookup: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => {
  const { getIsModalVisible, getInitialsValue } = EventFormSelectors;
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;

  return {
    isModalVisible: getIsModalVisible(state, props),
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
    initialsValue: getInitialsValue(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModalVisible: EventFormActions.setModalVisible,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
