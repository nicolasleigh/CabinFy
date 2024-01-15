import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGuest as createGuestApi } from '../../api/guests';
import toast from 'react-hot-toast';

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success('Guest successfully created');
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createGuest, isCreating };
};
