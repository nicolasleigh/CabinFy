import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut as logOutApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/admin/login', { replace: true });
    },
  });
  return { logout, isLoading };
}
