import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../Components/Common/Text';
import EventFormComponent from '../../Components/EventForm';
import { selectors as EventFormSelectors, actions as EventFormActions } from './Redux';

class EventForm extends React.Component {
  handleOnCloseModal = () => {
    const { setModalVisible } = this.props;
    setModalVisible(false);
    // set in redux ismodalvisible to false
  };

  renderEventForm = () => {
    const { isModalVisible } = this.props;
    return <EventFormComponent onCloseModal={this.handleOnCloseModal} isVisible={isModalVisible} />;
  };

  render() {
    return this.renderEventForm();
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const mapStateToProps = (state, props) => {
  const { getIsModalVisible } = EventFormSelectors;
  return {
    isModalVisible: getIsModalVisible(state, props),
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
