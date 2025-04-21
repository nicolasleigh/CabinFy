import CardSkeleton from "./CardSkeleton";

export default function HomeSkeleton() {
  return (
    <div className='grid grid-cols-4 gap-x-4 gap-y-8 mt-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
