import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Text from '../../Components/Common/Text';

class ViewProfile extends React.Component {
  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const userId = getParam('userId', {});
    Alert.alert(`${userId}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text.Bold text="USER PROFILE" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default ViewProfile;
