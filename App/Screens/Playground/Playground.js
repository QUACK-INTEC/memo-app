import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../Components/Common/Text';

const Playground = () => (
  <View style={styles.container}>
    <Text text="hola" />
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: 'red', flex: 1 },
});

export default Playground;
