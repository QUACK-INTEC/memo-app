import React from 'react';
import Lodash from 'lodash';
import TimePicker from '../Common/TimePickerWrapper';

const TimePickerWrapper = objProps => {
  const listFieldName = Lodash.get(objProps, ['field', 'name'], '').split('.');
  const skipTouched = Lodash.get(objProps, ['skipTouched'], false);
  const hasBeenTouched = Lodash.get(objProps, ['form', 'touched', ...listFieldName], false);
  const strError = Lodash.get(objProps, ['form', 'errors', ...listFieldName], null);
  const hasError = skipTouched ? strError : hasBeenTouched && strError;

  return (
    <TimePicker
      {...objProps.field}
      {...objProps}
      onChangeText={objProps.onChange}
      hasError={hasError}
      strError={strError}
    />
  );
};

export default TimePickerWrapper;
