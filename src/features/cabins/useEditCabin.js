import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCabin } from '../../api/cabins';
// import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // Only accept one argument, so use object as argument
    mutationFn: ({ newCabinData, id }) => updateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) =>
      toast.error(err.response.data.error || 'Failed to update cabin'),
  });
  return { editCabin, isEditing };
}
