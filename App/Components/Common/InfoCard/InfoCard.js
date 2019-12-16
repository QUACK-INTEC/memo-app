import React from 'react';
import { StyleSheet, ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme
import { colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';

class InfoCard extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    const { children, title, style, titleStyle, disabled } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={[styles.buttonStyle, style]}
        onPress={this.handleOnPress}
      >
        <Text.SemiBold
          text={title}
          style={[styles.titleStyle, titleStyle]}
          numberOfLines={2}
          ellipzeModde="tail"
        />
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: toBaseDesignPx(5),
    borderColor: colors.GRAY_LIGHT,
    borderWidth: toBaseDesignPx(1),
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    width: toBaseDesignPx(151),
    ...spacers.PA_2,
    justifyContent: 'center',
    height: toBaseDesignPx(80),
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: RFValue(10),
    color: colors.GRAY,
  },
});

InfoCard.defaultProps = {
  title: null,
  style: null,
  onPress: () => null,
  disabled: null,
  titleStyle: null,
};

InfoCard.propTypes = {
  title: PropTypes.string,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  titleStyle: PropTypes.string,
};

export default InfoCard;
