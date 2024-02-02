import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signupApi } from '../../api/guests';
import { toast } from 'react-hot-toast';

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (guest) => {
      toast.success('Account successfully created!');
      // queryClient.invalidateQueries({ queryKey: ['guest'] });
      queryClient.setQueryData(['guest'], guest);
    },
    onError: (err) => {
      toast.error(err.response.data.error || 'Something went wrong');
    },
  });
  return { signup, isLoading };
}
