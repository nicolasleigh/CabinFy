import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview as createReviewApi } from '../../api/reviews';
import toast from 'react-hot-toast';

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const { mutate: createReview, isLoading } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: () => {
      toast.success('Review successfully created');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, createReview };
};
