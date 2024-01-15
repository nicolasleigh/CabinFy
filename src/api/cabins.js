import { client } from './client';

export const getCabins = async () => {
  const { data } = await client.get('/api/cabins');
  return data;
};

export const createCabin = async (cabin) => {
  const form = new FormData();
  form.append('name', cabin.name);
  form.append('description', cabin.description);
  form.append('regularPrice', cabin.regularPrice);
  form.append('discount', cabin.discount);
  form.append('maxCapacity', cabin.maxCapacity);
  form.append('image', cabin.image);

  const { data } = await client.post('/api/cabins', form, {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const duplicateCabin = async (id) => {
  const { data } = await client.post(`/api/cabins/${id}/duplicate`);
  return data;
};

export const updateCabin = async (cabin, id) => {
  const form = new FormData();
  form.append('name', cabin.name);
  form.append('description', cabin.description);
  form.append('regularPrice', cabin.regularPrice);
  form.append('discount', cabin.discount);
  form.append('maxCapacity', cabin.maxCapacity);
  form.append('image', cabin.image);

  const { data } = await client.patch(`/api/cabins/${id}`, form, {
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteCabin = async (id) => {
  const { data } = await client.delete(`/api/cabins/${id}`);
  return data;
};
