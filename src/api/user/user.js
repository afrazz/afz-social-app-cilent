import instance from '..';

const getAllUser = (page) => instance.get(`users?page=${page}`);

const getCurrentUserProfileApi = () => instance.get(`users/currentprofile`);

const uploadprofileImg = data =>
  instance.put(`users/currentprofile/uploadprofileImg`, data);

const currentprofileUpdate = data =>
  instance.put(`users/currentprofile/updateprofile`, data);

const searchUser = (searchTerm, page) => instance.get(`/users/searchUser?searchTerm=${searchTerm}&page=${page}`);

export {
  getAllUser,
  getCurrentUserProfileApi,
  uploadprofileImg,
  currentprofileUpdate,
  searchUser
};
