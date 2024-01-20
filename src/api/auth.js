import { client } from './client';

export const signUp = async (user) => {
  const { data } = await client.post('/auth/signup', user);
  return data;
};

export const login = async (user) => {
  const { data } = await client.post('/auth/login', user);
  return data;
};

export const logOut = async () => {
  const { data } = await client.get('/auth/logout');
  return data;
};
