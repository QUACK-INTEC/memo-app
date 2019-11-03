import React from 'react';
import Lodash from 'lodash';
import TextInput from '../Common/TextInput';

const TextInputWrapper = objProps => {
  const listFieldName = Lodash.get(objProps, ['field', 'name'], '').split('.');
  const skipTouched = Lodash.get(objProps, ['skipTouched'], false);
  const hasBeenTouched = Lodash.get(objProps, ['form', 'touched', ...listFieldName], false);
  const strError = Lodash.get(objProps, ['form', 'errors', ...listFieldName], null);
  const hasError = skipTouched ? strError : hasBeenTouched && strError;

  return (
    <TextInput
      {...objProps.field}
      {...objProps}
      onChangeText={objProps.onChange}
      hasError={hasError}
    />
  );
};

export default TextInputWrapper;
