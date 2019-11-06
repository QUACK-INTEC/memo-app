import Lodash from 'lodash';
import { Alert } from 'react-native';

function Logger(objMessages, objInternalOptions) {
  const getMessage = objOption => {
    const objLoggerData = Lodash.get(objOption, ['data'], {});
    const objAxiosData = Lodash.get(objLoggerData, ['data'], {});
    const varKey = Lodash.get(objOption, ['key'], null);
    const strLoggerMessage = Lodash.get(objLoggerData, ['message'], null);
    const strAxiosMessage = Lodash.get(objAxiosData, ['message'], null);

    const varKeyData = Lodash.isFunction(varKey) ? varKey(objOption) : null;
    if (varKeyData) {
      return varKeyData;
    }

    if (strLoggerMessage) {
      return strLoggerMessage;
    }

    if (strAxiosMessage) {
      return strAxiosMessage;
    }

    return objMessages[varKey];
  };

  const success = objOption => {
    const successMessage = getMessage(objOption);
    if (successMessage && !objOption.skipFeedback) {
      if (objInternalOptions.successMethod) {
        return objInternalOptions.successMethod({
          title: objInternalOptions.titleSuccessKey,
          message: successMessage,
          data: objOption,
        });
      }

      return Alert.alert(objInternalOptions.titleSuccessKey, successMessage, [
        { text: objInternalOptions.textSuccessOption },
      ]);
    }

    return null;
  };

  const error = objOption => {
    const errorMessage = getMessage(objOption);

    if (errorMessage && !objOption.skipFeedback) {
      if (objInternalOptions.errorMethod) {
        return objInternalOptions.errorMethod({
          title: objInternalOptions.titleErrorKey,
          message: errorMessage,
          data: objOption,
        });
      }
      return Alert.alert(objInternalOptions.titleErrorKey, errorMessage, [
        { text: objInternalOptions.textErrorOption },
      ]);
    }

    return null;
  };

  return {
    error,
    success,
  };
}

export default Logger;
