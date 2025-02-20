import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../../api/reviews';

export const useReviews = (cabinId) => {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryFn: () => getReviews(cabinId),
    queryKey: ['reviews', cabinId],
  });

  return { isLoading, reviews, error };
};
