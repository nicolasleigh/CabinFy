import { client } from './client';

export const getGuests = async () => {
  const { data } = await client.get('/api/guests');
  return data;
};

export const createGuest = async (guest) => {
  const { data } = await client.post('/api/guests', guest);
  return data;
};

export const deleteGuest = async (id) => {
  const { data } = await client.delete(`/api/guests/${id}`);
  return data;
};

export const signUp = async (guest) => {
  const { data } = await client.post('/api/guests/signup', guest);
  return data;
};

export const logIn = async (guest) => {
  const { data } = await client.post('/api/guests/login', guest);
  return data;
};
