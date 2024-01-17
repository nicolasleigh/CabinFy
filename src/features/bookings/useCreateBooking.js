import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking as createBookingApi } from '../../api/bookings';
import toast from 'react-hot-toast';

// haven't used this hook yet
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully created');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isLoading };
};
