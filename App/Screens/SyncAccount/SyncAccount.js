import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

import SyncComponent from '../../Components/SyncComponent';

class SyncAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <SyncComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 /* alignItems: 'center', justifyContent: 'center' */ },
});

SyncAccount.defaultProps = {};

SyncAccount.propTypes = {};

export default SyncAccount;
