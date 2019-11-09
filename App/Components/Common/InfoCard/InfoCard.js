import React from 'react';
import { StyleSheet, ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

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
    const { children, title, style, titleStyle } = this.props;
    return (
      <TouchableOpacity style={[styles.buttonStyle, style]} onPress={this.handleOnPress}>
        <Text.SemiBold
          text={title}
          style={[styles.titleStyle, titleStyle]}
          numberOfLines={1}
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
  },
  titleStyle: {
    ...fonts.SIZE_XS,
    ...spacers.MT_4,
    ...spacers.ML_10,
    ...spacers.MR_10,
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
