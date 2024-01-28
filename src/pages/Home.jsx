import styled from 'styled-components';
import Card from '../ui/Card';
import GuestSignup from './GuestSignup';
import GuestLogin from './GuestLogin';
import { useCabins } from '../features/cabins/useCabins';

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

const imageURL = import.meta.env.VITE_IMAGE_URL;

export default function Home() {
  const { cabins, isLoading } = useCabins();
  console.log(cabins);
  return (
    <>
      <GuestSignup />
      <GuestLogin />
      <HomeLayout>
        {cabins &&
          cabins.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                src={imageURL + e.image}
                name={e.name}
                bed={e.bedroom}
                price={'$' + e.regularPrice}
                rate='4.6'
                images={e.images}
              />
            );
          })}
      </HomeLayout>
    </>
  );
}
