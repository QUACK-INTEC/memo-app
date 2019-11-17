export const DEFAULT_ERROR_MESSAGE = 'DEFAULT_ERROR_MESSAGE';
export const DEFAULT_SUCCESS_MESSAGE = 'DEFAULT_SUCCESS_MESSAGE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'SIGN_IN_FAILED';
export const SYNC_UNIVERSITY_SUCCESS = 'SYNC_UNIVERSITY_SUCCESS';
export const SYNC_UNIVERSITY_FAILED = 'SYNC_UNIVERSITY_FAILED';
export const LOAD_EVENTS_AND_MYCLASSES_SUCCESS = 'LOAD_EVENTS_AND_MYCLASSES_SUCCESS';
export const LOAD_EVENTS_AND_MYCLASSES_FAILED = 'LOAD_EVENTS_AND_MYCLASSES_FAILED';
export const LOAD_SUPPORTED_UNIVERSITIES_FAILED = 'LOAD_SUPPORTED_UNIVERSITIES_FAILED';
export const LOAD_SUPPORTED_UNIVERSITIES_SUCCESS = 'LOAD_SUPPORTED_UNIVERSITIES_SUCCESS';

const getLoggerMessages = () => {
  return {
    [DEFAULT_ERROR_MESSAGE]: 'Unexpected Error',
    [DEFAULT_SUCCESS_MESSAGE]: null,
    [SIGN_IN_SUCCESS]: null,
    [SIGN_IN_FAILED]: null,
    [REGISTER_SUCCESS]: null,
    [REGISTER_FAILED]: 'Error creating the new account. Try again later.',
    [SYNC_UNIVERSITY_SUCCESS]: null,
    [SYNC_UNIVERSITY_FAILED]: null,
    [LOAD_EVENTS_AND_MYCLASSES_SUCCESS]: null,
    [LOAD_EVENTS_AND_MYCLASSES_FAILED]: null,
    [LOAD_SUPPORTED_UNIVERSITIES_FAILED]: null,
    [LOAD_SUPPORTED_UNIVERSITIES_SUCCESS]: null,
  };
};

export default getLoggerMessages;
