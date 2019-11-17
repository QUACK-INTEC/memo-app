// TODO: Api
import axios from 'axios';

// const HTTP_STATUS = {
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   CONFLICT: 409,
// };
const API_VERSION = 1;
const API_HOST = `https://memo-staging.herokuapp.com/v${API_VERSION}`;

export const MemoApi = axios.create({
  baseURL: API_HOST,
});

const AuthCheck = () => {
  return MemoApi.get(`auth/check`);
};

const TokenRefresh = () => {
  return MemoApi.get(`auth/refresh`);
};

const Login = objUserLoginParams => {
  return MemoApi.post(`auth/login`, objUserLoginParams);
};

const Register = objUserRegisterParams => {
  return MemoApi.post(`auth/register`, objUserRegisterParams);
};

const SyncUniversity = objUserDetailUniversity => {
  return MemoApi.post(`sync`, objUserDetailUniversity);
};

const GetMyClasses = () => {
  return MemoApi.get(`sections`);
};

const Api = {
  AuthCheck,
  TokenRefresh,
  Login,
  Register,
  SyncUniversity,
  GetMyClasses,
};

export default Api;
