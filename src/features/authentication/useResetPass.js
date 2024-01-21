import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../api/auth';
import { toast } from 'react-hot-toast';

export function useResetPass() {
  const { mutate: resetPass, isLoading } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Password successfully reset!');
    },
    onError: (err) => {
      toast.error(err.response.data.error || 'Something went wrong');
    },
  });
  return { resetPass, isLoading };
}
