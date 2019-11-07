import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

// Common
import Text from '../Text';

class Link extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    const { text, textStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <Text.Black style={[styles.textStyle, textStyle]} text={text} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { textDecorationLine: 'underline', color: colors.GRAY, ...fonts.SIZE_XS },
});

Link.defaultProps = {
  text: null,
  textStyle: null,
  disabled: null,
  onPress: () => null,
};

Link.propTypes = {
  text: PropTypes.string,
  textStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Link;
