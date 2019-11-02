import React from 'react';
import { View, TextInput, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';

class TextInputWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  handleTextChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  };

  renderLabel = () => {
    const { title, titleStyle } = this.props;

    if (title) {
      return <Text.SemiBold text={title} style={[this.getTitleStyle(), titleStyle]} />;
    }

    return null;
  };

  getTitleStyle = () => {
    const { disabled } = this.props;

    if (disabled) {
      return styles.textTitleDisabled;
    }

    return styles.textTitle;
  };

  getTextInputStyle = () => {
    const { disabled } = this.props;

    if (disabled) {
      return styles.textInputDisabled;
    }

    return styles.textInput;
  };

  render() {
    const { placeholder, inputStyle, multiline, disabled } = this.props;
    const { value } = this.state;

    return (
      <View style={styles.mainView}>
        {this.renderLabel()}
        <TextInput
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.GRAY_LIGHT}
          onChangeText={this.handleTextChange}
          value={value}
          style={[this.getTextInputStyle(), inputStyle]}
          editable={!disabled}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.GRAY_LIGHT,
  },
  textInput: {
    ...fonts.SEMI_BOLD,
    color: colors.GRAY,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  textInputDisabled: {
    ...fonts.SEMI_BOLD,
    color: colors.DISABLED,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  textTitle: {
    color: colors.GRAY,
    ...fonts.SIZE_L,
  },
  textTitleDisabled: {
    color: colors.GRAY_LIGHT,
    ...fonts.SIZE_L,
  },
});

TextInputWrapper.defaultProps = {
  onChange: () => null,
  placeholder: null,
  title: null,
  titleStyle: null,
  inputStyle: null,
  multiline: false,
  disabled: null,
};

TextInputWrapper.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  inputStyle: ViewPropTypes.style,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TextInputWrapper;
