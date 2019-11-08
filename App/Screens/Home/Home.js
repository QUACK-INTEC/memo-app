import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../Components/Common/Text';

const Home = () => (
  <View style={styles.container}>
    <Text.Bold text="HOME" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Home;
