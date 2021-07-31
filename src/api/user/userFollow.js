import instance from '..';

const userAddFollow = data =>
  instance.post(`users/currentprofile/addFollow`, data);

const userRemoveFollow = data =>
  instance.post(`users/currentprofile/removeFollow`, data);

export {userAddFollow, userRemoveFollow};
