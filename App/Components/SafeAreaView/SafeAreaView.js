/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { constants } from '../../Core/Theme';

const SafeAreaView = ({ children, disableTopSpace, disableBottomSpace, style }) => {
  const disableStatusBarStyle = disableTopSpace ? { paddingTop: null } : null;
  const disableBottomSpaceStyle = disableBottomSpace ? { paddingBottom: null } : null;
  return (
    <View style={[styles.container, disableStatusBarStyle, disableBottomSpaceStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: constants.DEVICE.WIDTH,
    height: constants.DEVICE.HEIGHT,
    paddingTop: constants.DEVICE.STATUS_BAR_HEIGHT,
    paddingBottom: getBottomSpace(),
  },
});

export default SafeAreaView;
