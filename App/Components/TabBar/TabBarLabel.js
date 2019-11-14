import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, toBaseDesignPx } from '../../Core/Theme';

export default function TabBarLabel(props) {
  const { name, focused } = props;
  return <Text style={[styles.text, { color: focused ? colors.GREEN : colors.GRAY }]}>{name}</Text>;
}

TabBarLabel.defaultProps = {};

TabBarLabel.propTypes = {
  focused: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: toBaseDesignPx(10),
  },
});
