import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import EventFormComponent from '../../Components/EventForm';
import { selectors as EventFormSelectors, actions as EventFormActions } from './Redux';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import { Classes } from '../../Models';

const validation = objValues => {
  const errors = {};
  const { subject, description, title } = objValues;

  if (!title) {
    errors.title = 'Campo obligatorio';
  }

  if (!description) {
    errors.description = 'Campo obligatorio';
  }

  if (!subject) {
    errors.subject = 'Campo obligatorio';
  }

  return errors;
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialsValue: {},
    };
  }

  getInitialsValue = () => {
    const { initialsValue } = this.state;

    return {
      subject: null,
      description: null,
      endTime: null,
      dateTime: new Date(),
      startTime: null,
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

  handleOnCloseModal = () => {
    const { setModalVisible } = this.props;
    setModalVisible(false);
  };

  handleOnSubmitForm = objValues => {
    const { subject, description, endTime, dateTime, startTime, title, type } = objValues;
    // TODO: set start time and end time with date time in unix formatter with moment
    console.log({ subject, description, endTime, dateTime, startTime, title, type });
  };

  renderEventForm = () => {
    const { isModalVisible } = this.props;
    if (!isModalVisible) {
      return null;
    }
    return (
      <EventFormComponent
        onCloseModal={this.handleOnCloseModal}
        isVisible={isModalVisible}
        onSubmit={this.handleOnSubmitForm}
        initialValues={this.getInitialsValue()}
        validation={validation}
        isEditing={false}
        optionsClasses={this.getMyClassesOptions()}
      />
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
  const { getIsModalVisible } = EventFormSelectors;
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;

  return {
    isModalVisible: getIsModalVisible(state, props),
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
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
