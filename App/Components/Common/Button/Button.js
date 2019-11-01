import React from 'react';
import { StyleSheet, ViewPropTypes, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';

class BaseButton extends React.Component {
  getTextStyle = () => {
    const { secondary, disabled } = this.props;

    if (secondary) {
      return styles.secondaryText;
    }

    if (disabled) {
      return styles.primaryTextDisabled;
    }

    return styles.primaryText;
  };

  getContainerStyle = () => {
    const { secondary, disabled } = this.props;

    if (secondary) {
      if (disabled) {
        return styles.secondaryDisabled;
      }

      return styles.secondary;
    }

    if (disabled) {
      return styles.primaryDisabled;
    }

    return styles.primary;
  };

  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    const { containerStyle, textStyle, label } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        // style={{}}
      >
        <View style={[styles.base, this.getContainerStyle(), containerStyle]}>
          <Text.SemiBold text={label} style={[styles.baseText, this.getTextStyle(), textStyle]} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: toBaseDesignPx(5),
    ...fonts.SIZE_S,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: toBaseDesignPx(1),
    borderColor: colors.TRANSPARENT,
  },
  baseText: {
    ...spacers.MT_14,
    ...spacers.MB_14,
    ...spacers.ML_12,
    ...spacers.MR_12,
  },
  primary: {
    backgroundColor: colors.ACTION_COLOR,
  },
  primaryText: {
    color: colors.WHITE,
  },
  primaryDisabled: {
    backgroundColor: colors.GRAY_LIGHT,
  },
  primaryTextDisabled: {
    color: colors.GRAY,
  },
  secondary: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GREEN_LIGHT,
  },
  secondaryText: {
    color: colors.GREEN_LIGHT,
  },
  secondaryDisabled: {
    backgroundColor: colors.WHITE,
    opacity: 0.5,
    borderColor: colors.GREEN_LIGHT,
  },
});

BaseButton.defaultProps = {
  secondary: null,
  disabled: null,
  label: null,
  containerStyle: null,
  textStyle: null,
  onPress: () => null,
};

BaseButton.propTypes = {
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
};

export default BaseButton;
