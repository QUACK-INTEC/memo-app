// TODO: Api
import axios from 'axios';
// import Lodash from 'lodash';

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

// TODO: Interceptor ?? to handle token??
// MemoApi.interceptors.response.use(null, error => {
//   const { response } = error;
//   const status = Lodash.get(response, ['status'], null);
//   // if (status === HTTP_STATUS.UNAUTHORIZED) {
//   TokenRefresh()
//     .then(objResponseToken => {
//       console.log({ objResponseToken });
//     })
//     .catch(objError => {
//       console.log({ objError });
//     });
//   // }
// });

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

const GetSupportedUniversities = () => {
  return MemoApi.get(`sync/universities`);
};

const GetMyClasses = () => {
  return MemoApi.get(`sections`);
};

const GetSectionInfo = idSection => {
  return MemoApi.get(`sections/${idSection}`);
};

const GetSectionStudents = idSection => {
  return MemoApi.get(`sections/${idSection}/students`);
};

const DeletePost = idPost => {
  return MemoApi.delete(`posts/${idPost}`);
};

const Api = {
  AuthCheck,
  TokenRefresh,
  Login,
  Register,
  SyncUniversity,
  GetSupportedUniversities,
  GetMyClasses,
  GetSectionInfo,
  GetSectionStudents,
  DeletePost,
};

export default Api;
