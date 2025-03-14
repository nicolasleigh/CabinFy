import { client } from './client';

export const signUp = async (user) => {
  const { data } = await client.post('/api/auth/signup', user);
  return data;
};

export const login = async (user) => {
  const { data } = await client.post('/api/auth/login', user);
  return data;
};

export const logOut = async () => {
  const { data } = await client.get('/api/auth/logout');
  return data;
};

export const forgetPassword = async (user) => {
  const { data } = await client.post('/api/auth/forget-password', user);
  return data;
};

export const resetPassword = async ({ uid, token, password }) => {
  const { data } = await client.post(
    `/api/auth/reset-password/${uid}/${token}`,
    {
      password,
    }
  );
  return data;
};
