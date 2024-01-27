import { client } from './client';
// import Cookies from 'js-cookie';

export const createBooking = async (booking) => {
  console.log(booking);
  const { data } = await client.post('/api/bookings', booking);
  return data;
};

export const getBookings = async (options) => {
  // console.log(options);
  const { data } = await client.get('/api/bookings', {
    params: {
      filter: options.filter,
      sortBy: options.sortBy,
      page: options.page,
    },
  });
  // console.log(data);
  return data;
};

export const getBooking = async (bookingId) => {
  const { data } = await client.get(`/api/bookings/${bookingId}`);
  return data;
};

export const updateBooking = async (bookingId, booking) => {
  const { data } = await client.patch(`/api/bookings/${bookingId}`, booking);
  return data;
};

export const deleteBooking = async (bookingId) => {
  const { data } = await client.delete(`/api/bookings/${bookingId}`);
  return data;
};

export const getBookingsAfterDate = async (date) => {
  const { data } = await client.get('/api/bookings/after-date', {
    params: { date },
  });
  return data;
};

export const getStaysAfterDate = async (date) => {
  const { data } = await client.get('/api/bookings/stays-after-date', {
    params: { date },
  });
  return data;
};

export const getTodayActivity = async () => {
  const { data } = await client.get('/api/bookings/today-activity');
  return data;
};
