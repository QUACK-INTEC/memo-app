import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

// Common
import Text from '../Text';
import InLineComponent from '../InLineComponent';

class RadioButton extends React.Component {
  render = () => {
    const { text, textStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <InLineComponent leftChild={this.renderLeftIcon} rightChild={this.renderRightIcon}>
          <Text.Black style={[styles.textStyle, textStyle]} text={text} />
        </InLineComponent>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  textStyle: { color: colors.GRAY, ...fonts.SIZE_XS },
});

RadioButton.defaultProps = {
  textStyle: null,
};

RadioButton.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: ViewPropTypes.style,
};

export default RadioButton;
