import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logIn as logInApi } from '../../api/guests';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: logInApi,
    onSuccess: (guest) => {
      queryClient.setQueryData(['guest'], guest);
      toast.success('Guest successfully logged in!');
    },
    onError: () => {
      toast.error('Email or password are incorrect');
    },
  });
  return { login, isLoading };
}
