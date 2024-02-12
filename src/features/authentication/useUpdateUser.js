import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateUser as updateUserApi } from '../../api/users';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // in v5, isLoading becomes isPending
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // Only accept one argument, so use object as argument
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.invalidateQueries(['user']);
      queryClient.refetchQueries(['user']);
      // queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.response.data.error),
  });
  return { updateUser, isUpdating };
}
