import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { imageBaseUrl } from '../App';
import BookingForm from '../features/bookings/BookingForm';
import { useCabin } from '../features/cabins/useCabin';
import { useReviews } from '../features/guests/useReviews';
import FeatureIcon from '../ui/FeatureIcon';
import GuestReviewItem from '../ui/GuestReviewItem';
import GuestsFavoriteBox from '../ui/GuestsFavoriteBox';
import ReviewModal from '../ui/ReviewModal';
import GuestLogin from './GuestLogin';
import GuestSignup from './GuestSignup';
import CabinTextInfo from '../ui/CabinTextInfo';

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: var(--color-grey-100);
`;

const ImageLeft = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-xl) 0 0 var(--border-radius-xl);
`;
const ImageRight = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.6rem;
  border-radius: 0 var(--border-radius-xl) var(--border-radius-xl) 0;
  overflow: hidden;
`;
const ImageRightCell = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 5rem;
`;

const TextSection = styled.div``;

const ReviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 2rem 2.3rem;
`;

export default function Cabin() {
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [breakfast, setBreakfast] = useState(true);

  const { cabin, isLoading: isLoadingCabin } = useCabin();
  const { image, images, bedroom, discount, name, regularPrice } = cabin || {
    images: [],
  };

  const { cabinId } = useParams();
  const { reviews, isLoading: isLoadingReview } = useReviews(cabinId);

  return (
    <>
      <GuestSignup />
      <GuestLogin />

      <ImageSection>
        <ImageLeft src={imageBaseUrl + image} />
        <ImageRight>
          <ImageRightCell src={imageBaseUrl + images[0]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[1]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[2]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[3]?.fileName} />
        </ImageRight>
      </ImageSection>

      <Container>
        <TextSection>
          <CabinTextInfo
            bedroom={bedroom}
            discount={discount}
            regularPrice={regularPrice}
          />
          <GuestsFavoriteBox />
          <FeatureIcon />
          <ReviewBox>
            <GuestReviewItem reviews={reviews} limit={4} />
          </ReviewBox>
          <ReviewModal reviews={reviews} />
        </TextSection>

        <BookingForm
          guestsNumber={guestsNumber}
          setGuestsNumber={setGuestsNumber}
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          discount={discount}
          regularPrice={regularPrice}
          cabinId={cabinId}
        />
      </Container>
    </>
  );
}
