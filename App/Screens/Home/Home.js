import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../Components/Common/Text';

const Home = () => (
  <View style={styles.container}>
    <Text text="home" />
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: 'red', flex: 1 },
});

export default Home;
