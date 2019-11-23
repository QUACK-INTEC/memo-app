import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet } from 'react-native';
import Lodash from 'lodash';
import { Field, FastField } from 'formik';
import TextInput from './TextInput';
import DropDown from './DropDown';
import TimePicker from './TimePicker';

import { colors } from '../../Core/Theme';

const objInputs = {
  input: TextInput,
  dropdown: DropDown,
  timepicker: TimePicker,
};

class FormikInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
    };
  }

  handleOnChange = varValue => {
    const { field, form, onChange } = this.props;
    onChange(varValue);

    if (Lodash.isString(varValue)) {
      return field.onChange(field.name)(varValue);
    }
    return form.setFieldValue(field.name, varValue, true);
  };

  handleOnBlur = varValue => {
    const { field, form, onBlur } = this.props;
    this.setState({ isFocus: false });
    onBlur();

    if (!varValue) {
      return form.setFieldTouched(field.name, true, true);
    }

    return field.onBlur(field.name)(varValue);
  };

  handleOnFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocus: true });
    onFocus();
  };

  renderComponent = () => {
    const { style, plainInput } = this.props;
    const { isFocus } = this.state;
    const strType = Lodash.get(this.props, ['type'], 'input') || 'input';
    const isSubmitting = Lodash.get(this.props, ['form', 'isSubmitting'], null) || false;
    const InputComponent = objInputs[strType] || objInputs.input;

    const objFocusStyle = !isFocus ? null : { borderColor: colors.PRIMARY };

    if (plainInput) {
      return <InputComponent {...this.props} />;
    }

    return (
      <InputComponent
        disabled={isSubmitting}
        {...this.props}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
        isFocus={isFocus}
        style={[style, objFocusStyle, styles.input]}
      />
    );
  };

  render() {
    return this.renderComponent();
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
});

FormikInput.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  style: null,
  plainInput: false,
};

FormikInput.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  field: PropTypes.objectOf(Object),
  form: PropTypes.objectOf(Object),
  style: ViewPropTypes.style,
  plainInput: PropTypes.bool,
};

export default objProps => {
  if (objProps.plainInput) {
    return <FormikInput {...objProps} />;
  }

  if (objProps.withoutFastField) {
    return <Field component={FormikInput} {...objProps} />;
  }

  return <FastField component={FormikInput} {...objProps} />;
};
