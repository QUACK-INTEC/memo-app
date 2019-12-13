// TODO: Api
import axios from 'axios';
import { createFormDataPhoto } from '../../Utils';
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

const GetMyProfile = () => {
  return MemoApi.get(`profile`);
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

const CreatePost = objForm => {
  return MemoApi.post(`posts`, objForm);
};

const EditPost = (idPost, objForm) => {
  return MemoApi.put(`posts/${idPost}`, objForm);
};

const UploadProfilePicture = photo => {
  const formData = createFormDataPhoto(photo);
  return MemoApi.post('/upload/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const GetSectionPosts = idSection => {
  return MemoApi.get(`/sections/${idSection}/posts`);
};

const GetPostInfo = idPost => {
  return MemoApi.get(`posts/${idPost}`);
};

const UpvotePost = idPost => {
  return MemoApi.post(`posts/${idPost}/upvote`);
};

const DownvotePost = idPost => {
  return MemoApi.post(`posts/${idPost}/downvote`);
};

const ResetvotePost = idPost => {
  return MemoApi.post(`posts/${idPost}/resetvote`);
};

const AddSubTask = (idPost, objSubTask) => {
  return MemoApi.post(`posts/${idPost}/subtask`, objSubTask);
};

const UpdateSubTask = (idPost, idSubTask, objSubtaskUpdate) => {
  return MemoApi.put(`posts/${idPost}/subtask/${idSubTask}`, objSubtaskUpdate);
};

const DeleteSubTask = (idPost, idSubTask) => {
  return MemoApi.delete(`posts/${idPost}/subtask/${idSubTask}`);
};

const AddComment = (idPost, objComment) => {
  return MemoApi.post(`posts/${idPost}/comment`, objComment);
};

const DeleteComment = (idPost, idComment) => {
  return MemoApi.delete(`posts/${idPost}/comment/${idComment}`);
};

const GetSectionResources = idSubject => {
  return MemoApi.get(`subjects/${idSubject}/resources`);
};

const RegisterForNotifications = pushToken => {
  return MemoApi.post(`notifications/register`, { pushToken });
};

const Api = {
  AuthCheck,
  TokenRefresh,
  Login,
  Register,
  UploadProfilePicture,
  SyncUniversity,
  GetSupportedUniversities,
  GetMyClasses,
  GetSectionInfo,
  GetSectionStudents,
  DeletePost,
  CreatePost,
  EditPost,
  GetSectionPosts,
  GetPostInfo,
  UpvotePost,
  DownvotePost,
  ResetvotePost,
  AddSubTask,
  UpdateSubTask,
  DeleteSubTask,
  AddComment,
  DeleteComment,
  GetMyProfile,
  GetSectionResources,
  RegisterForNotifications,
};

export default Api;
