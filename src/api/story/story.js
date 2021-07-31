import instance from '..';

const uploadWriteContentStory = (data) =>
  instance.post('/user/story/createWriteContent', data);

const getStoriedUsers = () => instance.get('/user/story/getStoriesUser');

const getUserStoryApi = (id) =>
  instance.get(`/user/story/getStory?userId=${id}`);

export { uploadWriteContentStory, getStoriedUsers, getUserStoryApi };
