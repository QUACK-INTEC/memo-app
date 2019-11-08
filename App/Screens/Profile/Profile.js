import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../Components/Common/Text';

const Profile = () => (
  <View style={styles.container}>
    <Text.Bold text="PROFILE" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Profile;
