import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // in v5, isLoading becomes isPending
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // Only accept one argument, so use object as argument
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
