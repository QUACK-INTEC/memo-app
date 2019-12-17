/* eslint-disable import/no-unresolved */
import React from 'react';
import { View, ViewPropTypes, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
// eslint-disable-next-line import/no-unresolved
import { Appearance } from 'react-native-appearance';
// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

import Text from '../Text';

// Common
const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

class DatePickerComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      visible: false,
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

  getDatePickerStyle = () => {
    const { disabled } = this.props;
    const { value } = this.state;

    if (disabled || value == null) {
      return styles.datePickerDisabled;
    }

    return styles.datePicker;
  };

  getInputReference = input => {
    const { inputRef } = this.props;
    if (Lodash.isFunction(inputRef)) {
      return inputRef(input);
    }

    return inputRef;
  };

  showDateTimePicker = () => {
    this.setState({ visible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ visible: false });
  };

  handleDatePicked = date => {
    this.handleOptionChange(date);
    this.hideDateTimePicker();
  };

  render() {
    const { style, placeholder, containerStyle, hasError, value } = this.props;
    const { visible } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;
    const today = new Date();
    const dateSelected = value instanceof Date ? value : today;
    const labelDate = `${DAYS[dateSelected.getDay()]} ${dateSelected.getDate()}, ${
      MONTHS[dateSelected.getMonth()]
    }`;
    const colorScheme = Appearance.getColorScheme();
    let darkMode = false;
    if (colorScheme === 'dark') {
      darkMode = true;
    }

    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <DateTimePicker
            locale="es-DO"
            date={dateSelected}
            isVisible={visible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            isDarkModeEnabled={darkMode}
            titleIOS={placeholder}
          />
          <Text.SemiBold text={labelDate} style={[this.getDatePickerStyle(), style]} />
        </TouchableOpacity>
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
  datePicker: {
    ...fonts.SEMI_BOLD,
    color: colors.BLACK,
    ...spacers.MT_9,
    ...spacers.MB_14,
  },
  datePickerDisabled: {
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

DatePickerComponent.defaultProps = {
  onChange: () => {},
  inputRef: () => null,
  placeholder: 'Seleccione una fecha',
  label: null,
  labelStyle: null,
  disabled: false,
  hasError: false,
  style: null,
  containerStyle: null,
  value: null,
};

DatePickerComponent.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.shape(),
  labelStyle: PropTypes.shape({}),
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DatePickerComponent;
