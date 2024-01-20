import { useQuery } from '@tanstack/react-query';
// import { getCurrentUser } from '../../services/apiAuth';
import { getUser } from '../../api/users';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === 'USER' || user?.role === 'ADMIN',
  };
}
