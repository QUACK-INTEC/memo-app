import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: props.isOn,
    };
  }

  handleToggleChange = isOn => {
    const { onToggle } = this.props;
    this.setState({ isOn });
    onToggle(isOn);
  };

  renderToggleSwitch = () => {
    const { disabled, onColor, offColor, label, size, labelStyle, preDefinedStyle } = this.props;
    const { isOn } = this.state;
    const objLabelStyle = {
      ...fonts.SEMI_BOLD,
      color: colors.BLACK,
      ...fonts.SIZE_S,
      ...preDefinedStyle,
      ...labelStyle,
    };
    return (
      <ToggleSwitch
        isOn={isOn}
        onColor={onColor}
        offColor={offColor}
        label={label}
        labelStyle={objLabelStyle}
        size={size}
        onToggle={this.handleToggleChange}
        disabled={disabled}
      />
    );
  };

  render() {
    return this.renderToggleSwitch();
  }
}

const SimpleToggle = {
  Large: objProps => <Toggle {...objProps} size="large" preDefinedStyle={styles.largeLabelStyle} />,
  Medium: objProps => (
    <Toggle {...objProps} size="medium" preDefinedStyle={styles.mediumLabelStyle} />
  ),
  Small: objProps => <Toggle {...objProps} size="small" preDefinedStyle={styles.smallLabelStyle} />,
};

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
});

Toggle.defaultProps = {
  onToggle: () => null,
  disabled: false,
  isOn: false,
  onColor: colors.ACTION_COLOR,
  offColor: colors.GRAY_LIGHT,
  label: null,
  size: 'medium',
  labelStyle: null,
  preDefinedStyle: null,
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
  isOn: PropTypes.bool,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  preDefinedStyle: PropTypes.shape({}),
};

export default SimpleToggle;
