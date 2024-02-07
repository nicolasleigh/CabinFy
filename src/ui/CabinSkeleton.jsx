import styled from 'styled-components';
import Skeleton from './Skeleton';
import { useEffect, useState } from 'react';

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: var(--color-grey-100);

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const ImageLeft = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto auto auto 1fr auto;
  column-gap: 5rem;

  @media (max-width: 735px) {
    column-gap: 1rem;
  }

  @media (max-width: 630px) {
    row-gap: 2rem;
  }
`;

const ImageRight = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.6rem;
  border-radius: 0 var(--border-radius-xl) var(--border-radius-xl) 0;
  overflow: hidden;

  @media (max-width: 450px) {
    border-radius: var(--border-radius-xl);
  }
`;

const ReviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 2rem;

  grid-column: 1/2;
  grid-row: 4/5;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 630px) {
    grid-column: 1/-1;
  }
`;

const Location = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;

  @media (max-width: 830px) {
    grid-column: 1/-1;
    margin-bottom: 2rem;
  }
`;

const GuestsFavorite = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;

  @media (max-width: 830px) {
    grid-column: 1/-1;
  }
`;

const Featured = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  margin-top: 2rem;

  grid-column: 1/2;
  grid-row: 3/4;

  @media (max-width: 1100px) {
    gap: 1rem;
  }

  @media (max-width: 630px) {
    grid-column: 1/-1;
  }
`;

const FormSection = styled.div`
  grid-column: 2/-1;
  align-self: center;
  grid-row: 1/-1;

  @media (max-width: 830px) {
    grid-row: 3/-1;
  }

  @media (max-width: 630px) {
    grid-column: 1/-1;
    grid-row: 6/7;
  }
`;

export default function CabinSkeleton() {
  const mediaMatch = window.matchMedia('(max-width: 735px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener('change', handler);
    return () => mediaMatch.removeEventListener('change', handler);
  });

  return (
    <>
      <div>
        <Skeleton height={50} />
      </div>
      <ImageSection>
        <ImageLeft>
          {!matches ? <Skeleton height={310} /> : <Skeleton height={200} />}
        </ImageLeft>
        <ImageRight>
          {!matches ? (
            <>
              <Skeleton height={150} />
              <Skeleton height={150} />
              <Skeleton height={150} />
              <Skeleton height={150} />
            </>
          ) : (
            <>
              <Skeleton height={94} />
              <Skeleton height={94} />
              <Skeleton height={94} />
              <Skeleton height={94} />
            </>
          )}
        </ImageRight>
      </ImageSection>

      <Container>
        <Location>
          <Skeleton height={70} />
        </Location>
        <GuestsFavorite>
          <Skeleton height={90} />
        </GuestsFavorite>
        <Featured>
          <Skeleton height={200} />
          <Skeleton height={200} />
        </Featured>
        <ReviewBox>
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </ReviewBox>
        <FormSection>
          <Skeleton height={850} />
        </FormSection>
      </Container>
    </>
  );
}
