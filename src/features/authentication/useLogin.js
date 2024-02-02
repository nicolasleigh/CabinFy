import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { login as loginApi } from '../../services/apiAuth';
import { login as loginApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      // console.log(user);
      queryClient.setQueryData(['user'], user);
      navigate('/admin/dashboard', { replace: true });
    },
    onError: (err) => {
      toast.error('Email or password are incorrect');
    },
  });
  return { login, isLoading };
}
