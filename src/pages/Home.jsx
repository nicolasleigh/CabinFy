import styled from 'styled-components';
import Card from '../ui/Card';
import GuestSignup from './GuestSignup';
import GuestLogin from './GuestLogin';
import { useCabins } from '../features/cabins/useCabins';

const HomeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2.4rem;
  row-gap: 3.4rem;
  height: 100vh;
`;

const imageURL = import.meta.env.VITE_IMAGE_URL;

export default function Home() {
  const imgArr = [
    {
      img: '/cabin-001.webp',
      name: 'Cabin 1',
      bed: '1',
      price: '$100',
      rate: '4.5',
    },
    {
      img: '/cabin-002.webp',
      name: 'Cabin 2',
      bed: '2',
      price: '$200',
      rate: '4.5',
    },
    {
      img: '/cabin-003.webp',
      name: 'Cabin 3',
      bed: '3',
      price: '$300',
      rate: '4.6',
    },
    {
      img: '/cabin-004.webp',
      name: 'Cabin 4',
      bed: '4',
      price: '$400',
      rate: '4.6',
    },
    {
      img: '/cabin-005.webp',
      name: 'Cabin 5',
      bed: '5',
      price: '$500',
      rate: '4.4',
    },
    {
      img: '/cabin-006.webp',
      name: 'Cabin 6',
      bed: '6',
      price: '$600',
      rate: '4.6',
    },
    {
      img: '/cabin-007.webp',
      name: 'Cabin 7',
      bed: '7',
      price: '$700',
      rate: '4.3',
    },
    {
      img: '/cabin-008.webp',
      name: 'Cabin 8',
      bed: '8',
      price: '$800',
      rate: '4.2',
    },
    {
      img: '/cabin-009.webp',
      name: 'Cabin 9',
      bed: '9',
      price: '$900',
      rate: '4.7',
    },
    {
      img: '/cabin-010.webp',
      name: 'Cabin 10',
      bed: '10',
      price: '$1000',
      rate: '4.8',
    },
  ];

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
        {/* {imgArr.map((e) => {
          return (
            <Card
              key={e.name}
              src={e.img}
              name={e.name}
              bed={e.bed}
              price={e.price}
              rate={e.rate}
            />
          );
        })} */}
      </HomeLayout>
    </>
  );
}
