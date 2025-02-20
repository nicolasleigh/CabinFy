import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../api/guests';

export const useGuests = () => {
  const {
    isLoading,
    data: guests,
    error,
  } = useQuery({
    queryFn: getGuests,
    queryKey: ['guests'],
  });

  return { isLoading, guests, error };
};
