import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logIn as logInApi } from '../../api/guests';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: logInApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success('User successfully logged in!');
    },
    onError: (err) => {
      toast.error('Email or password are incorrect');
    },
  });
  return { login, isLoading };
}

//! todo: set token in localStorage
