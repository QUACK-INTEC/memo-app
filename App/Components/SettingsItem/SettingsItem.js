import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Common/Text';
import { colors, toBaseDesignPx, spacers } from '../../Core/Theme';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

class SettingsItem extends React.Component {
  renderRightArrow = () => {
    const { iconColor } = this.props;
    return (
      <Icon
        name="arrow-point-to-right"
        type={ICON_TYPE.MEMO_ICONS}
        size={ICON_SIZE.XTINY}
        color={iconColor || colors.GRAY}
      />
    );
  };

  render() {
    const { renderCustomRightChoice, onPress, hasOnPress, label, style, labelStyle } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={hasOnPress ? 0.2 : 1}
        onPress={onPress}
        style={[styles.container, style]}
      >
        <Text.SemiBold text={label} style={[styles.label, labelStyle]} />
        <View style={styles.rightChoiceContainer}>
          {renderCustomRightChoice ? renderCustomRightChoice() : this.renderRightArrow()}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.GRAY_LIGHT,
    marginRight: 0,
    ...spacers.ML_7,
    ...spacers.PB_2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: { color: colors.GRAY },
  rightChoiceContainer: {
    ...spacers.MR_2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
SettingsItem.defaultProps = {
  renderCustomRightChoice: null,
  onPress: () => null,
  hasOnPress: true,
  label: null,
  style: null,
  labelStyle: null,
  iconColor: null,
};

SettingsItem.propTypes = {
  renderCustomRightChoice: PropTypes.func,
  onPress: PropTypes.func,
  hasOnPress: PropTypes.bool,
  label: PropTypes.string,
  iconColor: PropTypes.string,
  style: PropTypes.shape(),
  labelStyle: PropTypes.shape(),
};

export default SettingsItem;
