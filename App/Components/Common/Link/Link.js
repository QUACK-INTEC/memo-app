import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

// Common
import ImageWrapper from '../ImageWrapper';
import InLineComponent from '../InLineComponent';
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
    const { text, textStyle, icon } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <InLineComponent>
          <ImageWrapper src={icon} memoSrc={icon} />
          <Text.Black style={[styles.textStyle, textStyle]} text={text} />
          <ImageWrapper src={icon} />
        </InLineComponent>
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
  icon: null,
  onPress: () => null,
};

Link.propTypes = {
  text: PropTypes.string,
  textStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Link;
