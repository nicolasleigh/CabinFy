import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Suspense, lazy, useState } from 'react';
import { imageBaseUrl } from '../App';
// import BookingForm from '../features/bookings/BookingForm';
import { useCabin } from '../features/cabins/useCabin';
import { useReviews } from '../features/guests/useReviews';
import FeatureIcon from '../ui/FeatureIcon';
import GuestReviewItem from '../features/guests/GuestReviewItem';
import GuestsFavoriteBox from '../features/guests/GuestsFavoriteBox';
import ReviewModal from '../ui/ReviewModal';
import GuestLogin from '../features/guests/GuestLogin';
import GuestSignup from '../features/guests/GuestSignup';
import CabinTextInfo from '../ui/CabinTextInfo';
import { useBookingByCabinId } from '../features/bookings/useBookingByCabinId';
import CabinSkeleton from '../ui/CabinSkeleton';
import Skeleton from '../ui/Skeleton';

const BookingForm = lazy(() => import('../features/bookings/BookingForm'));

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

const ImageLeft = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-xl) 0 0 var(--border-radius-xl);

  @media (max-width: 450px) {
    border-radius: var(--border-radius-xl);
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
const ImageRightCell = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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

const ReviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 2rem 2.3rem;
  margin-top: 2rem;

  grid-column: 1/2;
  grid-row: 4/5;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    padding: 0;
  }

  @media (max-width: 630px) {
    grid-column: 1/-1;
    padding: 2rem 2.3rem 0;
  }

  @media (max-width: 450px) {
    padding: 2rem 0 0;
  }
`;

const NameSection = styled.div`
  font-size: 3rem;
  font-weight: 600;

  @media (max-width: 450px) {
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

export default function Cabin() {
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(true);

  const { cabin, isLoading: isLoadingCabin } = useCabin();
  const { booking, isLoading: isLoadingBooking } = useBookingByCabinId();
  const { image, images, bedroom, discount, name, regularPrice, location } =
    cabin || {
      images: [],
    };

  const { cabinId } = useParams();
  const { reviews, isLoading: isLoadingReview } = useReviews(cabinId);

  if (isLoadingBooking || isLoadingCabin || isLoadingReview) {
    return <CabinSkeleton />;
  }

  return (
    <>
      <GuestSignup />
      <GuestLogin />
      <NameSection>{name}</NameSection>

      <ImageSection>
        <ImageLeft src={imageBaseUrl + image} alt='cabin cover photo' />
        <ImageRight>
          <ImageRightCell
            src={imageBaseUrl + images[0]?.fileName}
            alt='cabin interior photo 1'
          />
          <ImageRightCell
            src={imageBaseUrl + images[1]?.fileName}
            alt='cabin interior photo 2'
          />
          <ImageRightCell
            src={imageBaseUrl + images[2]?.fileName}
            alt='cabin interior photo 3'
          />
          <ImageRightCell
            src={imageBaseUrl + images[3]?.fileName}
            alt='cabin interior photo 4'
          />
        </ImageRight>
      </ImageSection>

      <Container>
        {/* <TextSection> */}
        <CabinTextInfo
          bedroom={bedroom}
          discount={discount}
          regularPrice={regularPrice}
          location={location}
        />
        <GuestsFavoriteBox reviews={reviews} />
        <FeatureIcon />
        <ReviewBox>
          <GuestReviewItem reviews={reviews} limit={4} />
        </ReviewBox>
        <ReviewModal reviews={reviews} />
        {/* </TextSection> */}

        <Suspense fallback={<Skeleton height={700} />}>
          <BookingForm
            guestsNumber={guestsNumber}
            setGuestsNumber={setGuestsNumber}
            hasBreakfast={hasBreakfast}
            setHasBreakfast={setHasBreakfast}
            discount={discount}
            regularPrice={regularPrice}
            cabinId={cabinId}
            booking={booking}
          />
        </Suspense>
      </Container>
    </>
  );
}
