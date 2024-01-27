import { useMutation } from '@tanstack/react-query';
import { signUp as signupApi } from '../../api/guests';
import { toast } from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success('Account successfully created!');
    },
    onError: (err) => {
      toast.error(err.response.data.error || 'Something went wrong');
    },
  });
  return { signup, isLoading };
}
