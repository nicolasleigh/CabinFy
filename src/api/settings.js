import { client } from './client';

export const getSettings = async () => {
  const { data } = await client.get('/api/settings');
  return data;
};

export const updateSetting = async (setting) => {
  const { data } = await client.patch('/api/settings', setting);
  console.log(data);
  return data;
};
