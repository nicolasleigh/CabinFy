import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBookingByCabinId } from '../../api/bookings';

export function useBookingByCabinId() {
  const { cabinId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking-cabin', cabinId],
    queryFn: () => getBookingByCabinId(cabinId),
    retry: false,
  });

  return { isLoading, error, booking };
}
