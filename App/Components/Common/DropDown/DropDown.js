import React from 'react';
import { View, ViewPropTypes, StyleSheet, Picker } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

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

  renderOptions = () => {
    const { options } = this.props;
    if (!options) return null;
    return options.map(obj => <Picker.Item key={obj.value} label={obj.label} value={obj.value} />);
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
    const { style, value, containerStyle, hasError, ...rest } = this.props;
    const { value: valueFromState } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;

    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <Picker
          onValueChange={this.handleOptionChange}
          {...rest}
          selectedValue={Lodash.toString(value || valueFromState)}
          ref={this.getInputReference}
          itemStyle={[this.getDropDownStyle(), style]}
        >
          {this.renderOptions()}
        </Picker>
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
  placeholder: null,
  label: null,
  labelStyle: null,
  disabled: null,
  hasError: false,
  style: null,
  containerStyle: null,
  value: '',
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
