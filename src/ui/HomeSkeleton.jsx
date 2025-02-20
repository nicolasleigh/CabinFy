import styled from 'styled-components';
import CardSkeleton from './CardSkeleton';

const HomeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
