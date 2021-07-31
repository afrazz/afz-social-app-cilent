import instance from '..';

const uploadPost = (data) => instance.post('user/post/create', data);

const getUsersPosts = (page) =>
  instance.get(`/user/post/viewUsersPost?page=${page}`);

const likePost = (data) => instance.post(`/user/post/addLike`, data);

const unLikePost = (data) => instance.delete(`/user/post/removeLike`, { data });

const viewPostLikes = (id) =>
  instance.get(`/user/post/getPostLikes`, { params: id });

const viewPostComments = (id) =>
  instance.get('/user/post/getPostComments', { params: { postId: id } });

const addComment = (data) => instance.post(`user/post/addComment`, data);

const removeComment = (data) =>
  instance.delete(`user/post/deleteComment`, { data });

export {
  uploadPost,
  getUsersPosts,
  likePost,
  unLikePost,
  viewPostLikes,
  addComment,
  removeComment,
  viewPostComments,
};
