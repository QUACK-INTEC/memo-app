import React from 'react';
import { View, TextInput, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';
import InLineComponent from '../InLineComponent';

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

  handleOnBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      return onBlur();
    }
    return null;
  };

  renderTitleLabel = () => {
    const { label, labelStyle, hasError } = this.props;
    const errorLabelStyle = hasError ? styles.errorLabelStyle : null;

    return (
      <Text.SemiBold text={label} style={[this.getLabelStyle(), errorLabelStyle, labelStyle]} />
    );
  };

  renderErrorLabel = () => {
    const { hasError, strError } = this.props;

    if (!hasError) {
      return null;
    }

    return (
      <Text.ItalicLight
        text={`${strError}*`}
        style={{ color: colors.ERROR, ...spacers.ML_1, ...fonts.SIZE_XS }}
      />
    );
  };

  renderLabel = () => {
    const { label } = this.props;

    if (label) {
      return (
        <InLineComponent leftChild={this.renderTitleLabel} rightChild={this.renderErrorLabel} />
      );
    }

    return null;
  };

  getLabelStyle = () => {
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

  getInputReference = input => {
    const { inputRef } = this.props;
    if (Lodash.isFunction(inputRef)) {
      return inputRef(input);
    }

    return inputRef;
  };

  render() {
    const {
      placeholder,
      style,
      multiline,
      disabled,
      value,
      containerStyle,
      hasError,
      ...rest
    } = this.props;
    const { value: valueFromState } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;
    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <TextInput
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.GRAY_LIGHT}
          onChangeText={this.handleTextChange}
          onBlur={this.handleOnBlur}
          editable={!disabled}
          {...rest}
          value={Lodash.toString(value || valueFromState)}
          ref={this.getInputReference}
          style={[this.getTextInputStyle(), style]}
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
  errorStyle: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.ERROR,
  },
  textInput: {
    ...fonts.SEMI_BOLD,
    color: colors.BLACK,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  textInputDisabled: {
    ...fonts.SEMI_BOLD,
    color: colors.DISABLED,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  errorLabelStyle: {
    color: colors.ERROR,
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
  onChange: () => {},
  onBlur: () => null,
  inputRef: () => null,
  placeholder: null,
  label: null,
  labelStyle: null,
  multiline: false,
  disabled: null,
  hasError: false,
  style: null,
  containerStyle: null,
  value: '',
  strError: null,
};

TextInputWrapper.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  strError: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default TextInputWrapper;
