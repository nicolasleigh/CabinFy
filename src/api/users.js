import { client } from './client';

export const getUser = async () => {
  const { data } = await client.get('/api/users');
  console.log(data);
  return data;
};

export const updateUser = async ({ password, username, avatar }) => {
  let updateData;
  if (password) updateData = { password };
  if (username) updateData = { username };
  const { data: data1 } = await client.patch('/api/users', updateData);
  if (!avatar) return data1;

  const form = new FormData();
  form.append('avatar', avatar);
  const { data: data2 } = await client.patch('/api/users/avatar', form, {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data2;
};
