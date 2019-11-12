import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import SyncComponent from '../../Components/SyncComponent';
import LoadingState from '../../Components/LoadingState';

class SyncAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = () => {
    this.setLoading(true);
    // TO-DO API
    return false;
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;
    return (
      <View style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        <SyncComponent onSubmit={this.handleSubmit} initialsValue={initialsValue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SyncAccount.defaultProps = {
  initialsValue: null,
};

SyncAccount.propTypes = {
  initialsValue: PropTypes.shape({}),
};

export default SyncAccount;
