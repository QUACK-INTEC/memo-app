import React from 'react';
import Lodash from 'lodash';
import DatePicker from '../Common/DatePicker';

const DatePickerWrapper = objProps => {
  const listFieldName = Lodash.get(objProps, ['field', 'name'], '').split('.');
  const skipTouched = Lodash.get(objProps, ['skipTouched'], false);
  const hasBeenTouched = Lodash.get(objProps, ['form', 'touched', ...listFieldName], false);
  const strError = Lodash.get(objProps, ['form', 'errors', ...listFieldName], null);
  const hasError = skipTouched ? strError : hasBeenTouched && strError;

  return (
    <DatePicker
      {...objProps.field}
      {...objProps}
      onChange={objProps.onChange}
      hasError={hasError}
    />
  );
};

export default DatePickerWrapper;
