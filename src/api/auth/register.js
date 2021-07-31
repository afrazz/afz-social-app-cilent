import instance from '..';

const register = data => instance.post('auth/register', data);

export default register;
