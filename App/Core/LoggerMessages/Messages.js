export const DEFAULT_ERROR_MESSAGE = 'DEFAULT_ERROR_MESSAGE';
export const DEFAULT_SUCCESS_MESSAGE = 'DEFAULT_SUCCESS_MESSAGE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

const getLoggerMessages = () => {
  return {
    [DEFAULT_ERROR_MESSAGE]: 'Unexpected Error',
    [DEFAULT_SUCCESS_MESSAGE]: null,
    [SIGN_IN_SUCCESS]: null,
    [SIGN_IN_FAILED]: null,
  };
};

export default getLoggerMessages;
