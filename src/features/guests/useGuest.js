import { useQuery } from '@tanstack/react-query';
import { getGuest } from '../../api/guests';

export const useGuest = () => {
  const {
    isLoading,
    data: guest,
    error,
  } = useQuery({
    queryFn: getGuest,
    queryKey: ['guest', guest.uid],
  });

  return { isLoading, guest, error };
};
