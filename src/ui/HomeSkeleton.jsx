import { HomeLayout } from '../pages/Home';
import CardSkeleton from './CardSkeleton';

export default function HomeSkeleton() {
  return (
    <HomeLayout>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </HomeLayout>
  );
}
