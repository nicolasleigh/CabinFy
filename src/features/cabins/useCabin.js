import { useQuery } from '@tanstack/react-query';
import { getCabin } from '../../api/cabins';
import { useParams } from 'react-router-dom';
// import { getCabins } from '../../services/apiCabins';

export function useCabin() {
  const { cabinId } = useParams();
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: ['cabin', cabinId],
    queryFn: () => getCabin(cabinId),
  });

  return { isLoading, error, cabin };
}
