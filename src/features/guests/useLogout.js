import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logOut as logOutApi } from '../../api/guests';

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries(['guest']);
      toast.success('You are successfully logged out!');
    },
  });
  return { logout, isLoading };
}
