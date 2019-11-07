import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { colors, toBaseDesignPx } from '../../Core/Theme';

export default class TabBarIcon extends Component {
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
    const { focused, name, type, size, colorFocused, colorDef } = this.props;
    return (
      <Icon
        name={name}
        type={ICON_TYPE[type]}
        size={ICON_SIZE[size]}
        color={focused ? colors[colorFocused] : colors[colorDef]}
        style={this.handleStyle()}
      />
    );
  }
}

TabBarIcon.defaultProps = {
  type: 'MEMO_ICONS',
  size: 'TINY',
  colorDef: 'GRAY',
  colorFocused: 'GREEN',
  center: false,
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  colorDef: PropTypes.string,
  colorFocused: PropTypes.string,
  center: PropTypes.bool,
};

const styles = StyleSheet.create({
  centerTabIcon: {
    marginBottom: toBaseDesignPx(15),
    paddingHorizontal: toBaseDesignPx(15),
    paddingVertical: toBaseDesignPx(10),
    alignContent: 'center',
    backgroundColor: colors.GREEN,
    borderRadius: toBaseDesignPx(100),
  },
  focusedBG: {
    backgroundColor: colors.GREEN_MEDIUM,
  },
  tabIcon: {},
});
