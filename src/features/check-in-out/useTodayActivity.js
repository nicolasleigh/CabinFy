import { useQuery } from '@tanstack/react-query';
import { getTodayActivity } from '../../api/bookings';

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getTodayActivity,
    queryKey: ['today-activity'],
  });
  return { activities, isLoading };
}
