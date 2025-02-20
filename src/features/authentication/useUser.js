import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/users';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === 'USER' || user?.role === 'ADMIN',
  };
}
