import styled from "styled-components";
import Card from "../ui/Card";
import GuestSignup from "../features/guests/GuestSignup";
import GuestLogin from "../features/guests/GuestLogin";
import { useCabins } from "../features/cabins/useCabins";
import { useRate } from "../features/guests/useRate";
import HomeSkeleton from "../ui/HomeSkeleton";

const HomeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(10, fit-content(100%)); */
  grid-auto-rows: 1fr;

  column-gap: 2.4rem;
  row-gap: 3.4rem;
  margin-top: 2rem;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// const imageURL = import.meta.env.VITE_IMAGE_URL;

export default function Home() {
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { rate, isLoading: isLoadingRate } = useRate();

  console.log(cabins);

  const avgRating = rate?.map((e) => {
    return Math.ceil(e._avg.rating * 10) / 10;
  });
  // console.log(avgRating);

  if (isLoadingCabins || isLoadingRate) return <HomeSkeleton />;

  return (
    <>
      <GuestSignup />
      <GuestLogin />
      <div className='grid grid-cols-4 gap-x-6 gap-y-8'>
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
  // return (
  //   <>
  //     <GuestSignup />
  //     <GuestLogin />
  //     <HomeLayout>
  //       {cabins &&
  //         cabins.map((e) => {
  //           return (
  //             <Card
  //               key={e.id}
  //               id={e.id}
  //               src={imageURL + e.image}
  //               name={e.name}
  //               bed={e.bedroom}
  //               discount={e.discount}
  //               price={"CN¥ " + e.regularPrice}
  //               rate={avgRating?.[e.id - 1]}
  //               images={e.images}
  //             />
  //           );
  //         })}
  //     </HomeLayout>
  //   </>
  // );
}
