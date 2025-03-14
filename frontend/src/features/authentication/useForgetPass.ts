import { useMutation } from '@tanstack/react-query';
import { forgetPassword as forgetPasswordApi } from '../../api/auth';
import { toast } from 'react-hot-toast';

export function useForgetPass() {
  const { mutate: forgetPass, isLoading } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: () => {
      toast.success('Check your email to reset password!');
    },
    onError: (err) => {
      toast.error(err.response.data.error || 'Something went wrong');
    },
  });
  return { forgetPass, isLoading };
}
