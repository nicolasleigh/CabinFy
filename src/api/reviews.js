import { client } from './client';

export const createReview = async (review) => {
  const { data } = await client.post('/api/reviews', review);
  return data;
};

export const getReviews = async (cabinId) => {
  const { data } = await client.get(`/api/reviews/${cabinId}`);
  return data;
};

export const getRate = async () => {
  const { data } = await client.get(`/api/reviews`);
  return data;
};
