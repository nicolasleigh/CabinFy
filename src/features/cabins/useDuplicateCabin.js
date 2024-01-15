import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
// import { createEditCabin } from '../../services/apiCabins';
import { duplicateCabin as duplicateCabinApi } from '../../api/cabins';

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { mutate: duplicateCabin, isLoading: isDuplicating } = useMutation({
    // mutationFn: createEditCabin,
    mutationFn: ({ id }) => duplicateCabinApi(id),
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDuplicating, duplicateCabin };
}
