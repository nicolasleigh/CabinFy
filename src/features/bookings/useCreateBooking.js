import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking as createBookingApi } from '../../api/bookings';
import toast from 'react-hot-toast';

export const useCreateBooking = (cabinId) => {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully created');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking-cabin', cabinId] });
    },
    onError: (err) => {
      toast.error(
        err.response.data === 'Unauthorized'
          ? 'Please login before booking!'
          : err.response.data.message
      );
    },
  });

  return { createBooking, isLoading };
};
