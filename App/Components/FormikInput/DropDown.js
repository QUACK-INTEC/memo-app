import React from 'react';
import Lodash from 'lodash';
import DropDown from '../Common/DropDown';

const DropDownWrapper = objProps => {
  const listFieldName = Lodash.get(objProps, ['field', 'name'], '').split('.');
  const skipTouched = Lodash.get(objProps, ['skipTouched'], false);
  const hasBeenTouched = Lodash.get(objProps, ['form', 'touched', ...listFieldName], false);
  const strError = Lodash.get(objProps, ['form', 'errors', ...listFieldName], null);
  const hasError = skipTouched ? strError : hasBeenTouched && strError;

  return (
    <DropDown
      {...objProps.field}
      {...objProps}
      onChangeOption={objProps.onChange}
      hasError={hasError}
    />
  );
};

export default DropDownWrapper;
