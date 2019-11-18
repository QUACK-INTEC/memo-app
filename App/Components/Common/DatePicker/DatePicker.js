import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import DatePicker from 'react-native-datepicker';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import Text from '../Text';

class DatePickerComponent extends React.Component {
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

  getDatePickerStyle = () => {
    const { disabled } = this.props;

    if (disabled) {
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

  render() {
    const { style, placeholder, disabled, containerStyle, hasError, ...rest } = this.props;
    const { value: valueFromState } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;
    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <View style={styles.inputContainer}>
          <DatePicker
            style={{ width: '100%' }}
            date={valueFromState}
            mode="date"
            locale="es-do"
            showIcon={false}
            placeholder="Select date"
            format="DD dddd, MMMM"
            // minDate="2016-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-start',
              },
              dateText: [{ textAlign: 'left' }, this.getDatePickerStyle(), style],
              placeholderText: [{ textAlign: 'left' }, styles.datePickerDisabled, style],
              disabled: [{ textAlign: 'left' }, styles.datePickerDisabled, style],
            }}
            onDateChange={this.handleOptionChange}
            {...rest}
          />
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
  },
  triangle: {
    color: colors.GRAY,
    fontSize: toBaseDesignPx(10),
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
  placeholder: 'Seleccione una opcion',
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
  value: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DatePickerComponent;
