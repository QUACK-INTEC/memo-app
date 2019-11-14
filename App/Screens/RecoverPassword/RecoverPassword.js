import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../Components/Common/Text';

const RecPass = () => (
  <View style={styles.container}>
    <Text.Bold text="RECOVER PASSWORD" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default RecPass;
