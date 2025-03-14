import { useQuery } from '@tanstack/react-query';
import { getRate } from '../../api/reviews';

export const useRate = () => {
  const {
    isLoading,
    data: rate,
    error,
  } = useQuery({
    queryFn: () => getRate(),
    queryKey: ['rate'],
  });

  return { isLoading, rate, error };
};
