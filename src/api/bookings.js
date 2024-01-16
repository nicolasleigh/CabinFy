import { client } from './client';

export const createBooking = async (booking) => {
  const { data } = await client.post('/api/bookings', booking);
  return data;
};

export const getBookings = async () => {
  const { data } = await client.get('/api/bookings');
  return data;
};
