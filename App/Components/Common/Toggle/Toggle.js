import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

// Constants
import { TOGGLE_SIZE } from './Constants';

// Theme
import { colors, fonts, toBaseDesignPx, spacers } from '../../../Core/Theme';
import InLineComponent from '../InLineComponent';
import Text from '../Text';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleOnBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      return onBlur();
    }
    return null;
  };

  handleToggleChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
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

  getPredefinedStyle = () => {
    const { size } = this.props;
    switch (size) {
      case TOGGLE_SIZE.SMALL:
        return styles.smallLabelStyle;
      case TOGGLE_SIZE.MEDIUM:
        return styles.mediumLabelStyle;
      case TOGGLE_SIZE.LARGE:
        return styles.largeLabelStyle;
      default:
        return null;
    }
  };

  getInputReference = input => {
    const { inputRef } = this.props;
    if (Lodash.isFunction(inputRef)) {
      return inputRef(input);
    }

    return inputRef;
  };

  renderToggleSwitch = () => {
    const { hasError, disabled, onColor, offColor, label, size, labelStyle } = this.props;
    const errorLabelStyle = hasError ? styles.errorLabelStyle : null;
    const errorStyle = hasError ? styles.errorStyle : null;
    const { value: valueFromState } = this.state;
    const preDefinedStyle = this.getPredefinedStyle();
    const objLabelStyle = {
      ...fonts.SEMI_BOLD,
      color: colors.BLACK,
      ...fonts.SIZE_S,
      ...preDefinedStyle,
      ...labelStyle,
      ...errorLabelStyle,
    };
    return (
      <View style={errorStyle}>
        <InLineComponent>
          <ToggleSwitch
            isOn={valueFromState}
            onColor={onColor}
            offColor={offColor}
            label={label}
            labelStyle={objLabelStyle}
            size={size}
            onToggle={this.handleToggleChange}
            disabled={disabled}
            ref={this.getInputReference}
          />
          {this.renderErrorLabel()}
        </InLineComponent>
      </View>
    );
  };

  render() {
    return this.renderToggleSwitch();
  }
}

const styles = StyleSheet.create({
  largeLabelStyle: {
    ...fonts.SIZE_XL,
  },
  mediumLabelStyle: {
    ...fonts.SIZE_S,
  },
  smallLabelStyle: {
    ...fonts.SIZE_XS,
  },
  errorLabelStyle: {
    color: colors.ERROR,
  },
  errorStyle: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.ERROR,
  },
});

Toggle.defaultProps = {
  onChange: () => null,
  disabled: false,
  value: false,
  onColor: colors.ACTION_COLOR,
  offColor: colors.GRAY_LIGHT,
  label: null,
  size: 'medium',
  labelStyle: null,
  preDefinedStyle: null,
  hasError: false,
  strError: null,
  inputRef: () => null,
  onBlur: () => null,
};

Toggle.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  preDefinedStyle: PropTypes.shape({}),
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  strError: PropTypes.string,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Toggle;
