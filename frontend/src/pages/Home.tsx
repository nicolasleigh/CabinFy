import { useCabins } from "../features/cabins/useCabins";
import { useRate } from "../features/guests/useRate";
import Card from "../ui/Card";
import HomeSkeleton from "@/ui/HomeSkeleton";

export default function Home() {
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { rate, isLoading: isLoadingRate } = useRate();

  // console.log(cabins);

  const avgRating = rate?.map((e) => {
    return Math.ceil(e._avg.rating * 10) / 10;
  });
  // console.log(avgRating);

  if (isLoadingCabins || isLoadingRate) return <HomeSkeleton />;

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
        {cabins &&
          cabins.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                src={e.image}
                name={e.name}
                bed={e.bedroom}
                discount={e.discount}
                price={"CN¥ " + e.regularPrice}
                rate={avgRating?.[e.id - 1]}
              />
            );
          })}
      </div>
    </>
  );
}
