import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';

import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { colors } from '../../Core/Theme';

export default class TabBarIcon extends Component {
  renderIconWithContainer = () => {
    const { name, type, size, color, containerStyle } = this.props;

    return (
      <View style={containerStyle}>
        <Icon name={name} type={type} size={size} color={color} />
      </View>
    );
  };

  handleStyle = () => {
    const { center, focused } = this.props;
    if (center) {
      if (focused) {
        return [styles.centerTabIcon, styles.focusedBG];
      }
      return styles.centerTabIcon;
    }
    return styles.tabIcon;
  };

  render() {
    const { focused, name, type, size, colorFocused, colorDef, containerStyle } = this.props;

    if (containerStyle) {
      return this.renderIconWithContainer();
    }
    return (
      <Icon
        name={name}
        type={type}
        size={size}
        color={focused ? colors[colorFocused] : colors[colorDef]}
        style={styles.tabIcon}
      />
    );
  }
}

TabBarIcon.defaultProps = {
  type: ICON_TYPE.MEMO_ICONS,
  size: ICON_SIZE.TINY,
  colorDef: 'GRAY',
  colorFocused: 'GREEN',
  center: false,
  focused: false,
  color: null,
  containerStyle: null,
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  colorDef: PropTypes.string,
  colorFocused: PropTypes.string,
  center: PropTypes.bool,
  color: PropTypes.string,
  containerStyle: PropTypes.shape({}),
};

const styles = StyleSheet.create({
  focusedBG: {
    backgroundColor: colors.GREEN_MEDIUM,
  },
  tabIcon: {},
});
