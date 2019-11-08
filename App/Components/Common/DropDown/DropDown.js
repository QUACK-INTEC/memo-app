import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import RNPickerSelect from 'react-native-picker-select';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';

class DropDownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleOptionChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  };

  renderLabel = () => {
    const { label, labelStyle, hasError } = this.props;
    const errorLabelStyle = hasError ? styles.errorLabelStyle : null;

    if (label) {
      return (
        <Text.SemiBold text={label} style={[this.getLabelStyle(), errorLabelStyle, labelStyle]} />
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

  getDropDownStyle = () => {
    const { disabled } = this.props;

    if (disabled) {
      return styles.dropDownDisabled;
    }

    return styles.dropDown;
  };

  getInputReference = input => {
    const { inputRef } = this.props;
    if (Lodash.isFunction(inputRef)) {
      return inputRef(input);
    }

    return inputRef;
  };

  render() {
    const { style, placeholder, options, disabled, containerStyle, hasError, ...rest } = this.props;
    const { value: valueFromState } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;
    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <View style={styles.inputContainer}>
          <RNPickerSelect
            placeholder={{
              label: placeholder,
              value: null,
            }}
            {...rest}
            onValueChange={this.handleOptionChange}
            items={options}
            style={{
              inputIOS: [this.getDropDownStyle(), style],
              inputAndroid: [this.getDropDownStyle(), style],
            }}
            disabled={disabled}
            value={valueFromState}
            useNativeAndroidPickerStyle={false}
          />
          <Text.SemiBold text="▼" style={[styles.triangle]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.GRAY_LIGHT,
  },
  inputContainer: {
    ...spacers.PV_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triangle: {
    color: colors.GRAY,
    fontSize: toBaseDesignPx(10),
  },
  errorStyle: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.ERROR,
  },
  dropDown: {
    ...fonts.SEMI_BOLD,
    color: colors.BLACK,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  dropDownDisabled: {
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

DropDownComponent.defaultProps = {
  onChange: () => {},
  inputRef: () => null,
  placeholder: 'Seleccione una opcion',
  label: null,
  labelStyle: null,
  disabled: null,
  hasError: false,
  style: null,
  containerStyle: null,
  value: null,
};

DropDownComponent.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default DropDownComponent;
