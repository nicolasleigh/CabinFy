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

export const forgetPassword = async (user) => {
  const { data } = await client.post('/auth/forget-password', user);
  return data;
};

export const resetPassword = async ({ uid, token, password }) => {
  const { data } = await client.post(`/auth/reset-password/${uid}/${token}`, {
    password,
  });
  return data;
};
