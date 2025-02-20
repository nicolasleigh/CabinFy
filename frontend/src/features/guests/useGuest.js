import { useQuery } from '@tanstack/react-query';
import { getGuest } from '../../api/guests';

export const useGuest = () => {
  const {
    isLoading,
    data: guest,
    error,
  } = useQuery({
    queryFn: getGuest,
    queryKey: ['guest'],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, guest, error };
};
