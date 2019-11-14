import React from 'react';
import { StyleSheet } from 'react-native';
import RadioButton from 'react-native-radio-button';
import PropTypes from 'prop-types';

// Theme
import { colors, spacers } from '../../../Core/Theme';

// Common
import InLineComponent from '../InLineComponent';
import Text from '../Text';

class RadioButtonWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: props.isPressed,
    };
  }

  handlePress = isPressed => {
    const { onPress } = this.props;
    this.setState({ isPressed });
    onPress(isPressed);
  };

  renderText = () => {
    const { text, textStyle } = this.props;

    if (text) {
      return <Text.SemiBold text={text} style={[styles.textStyle, textStyle]} />;
    }

    return null;
  };

  render() {
    const { isPressed } = this.state;
    return (
      <InLineComponent>
        <RadioButton
          innerColor={isPressed ? colors.ORANGE_LIGHT : colors.WHITE}
          outerColor={isPressed ? colors.ORANGE : colors.GRAY}
          isSelected={isPressed}
          onPress={() => this.handlePress(!isPressed)}
        />
        {this.renderText()}
      </InLineComponent>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: { color: colors.GRAY, ...spacers.ML_2 },
});

RadioButtonWrapper.defaultProps = {
  text: null,
  textStyle: null,
  isPressed: false,
  onPress: () => null,
};

RadioButtonWrapper.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.shape({}),
  isPressed: PropTypes.bool,
  onPress: PropTypes.func,
};

export default RadioButtonWrapper;
