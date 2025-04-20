import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Suspense, lazy, useState } from "react";
// import BookingForm from '../features/bookings/BookingForm';
import { useCabin } from "../features/cabins/useCabin";
import { useReviews } from "../features/guests/useReviews";
import FeatureIcon from "../ui/FeatureIcon";
import GuestReviewItem from "../features/guests/GuestReviewItem";
import GuestsFavoriteBox from "../features/guests/GuestsFavoriteBox";
import ReviewModal from "../ui/ReviewModal";
import GuestLogin from "../features/guests/GuestLogin";
import GuestSignup from "../features/guests/GuestSignup";
import CabinTextInfo from "../ui/CabinTextInfo";
import { useBookingByCabinId } from "../features/bookings/useBookingByCabinId";
import CabinSkeleton from "../ui/CabinSkeleton";
import Skeleton from "../ui/Skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import GuestsReviews from "@/features/guests/GuestsReviews";
import GuestAddReview from "@/features/guests/GuestAddReview";

const BookingForm = lazy(() => import("../features/bookings/BookingForm"));

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
  const [addReviewOpen, setAddReviewOpen] = useState(false);

  const { cabin, isLoading: isLoadingCabin } = useCabin();
  const { booking, isLoading: isLoadingBooking } = useBookingByCabinId();
  const { image, images, bedroom, discount, name, regularPrice, location } = cabin || {
    images: [],
  };

  const { cabinId } = useParams();
  const { reviews, isLoading: isLoadingReview } = useReviews(cabinId);

  if (isLoadingBooking || isLoadingCabin || isLoadingReview) {
    return <CabinSkeleton />;
  }

  return (
    <>
      <div className='text-3xl font-semibold'>{name}</div>

      <div className='grid grid-cols-1 gap-2 py-5 sm:grid-cols-2'>
        <img
          className='rounded-t-xl w-full h-full object-cover sm:rounded-none sm:rounded-l-xl aspect-[3/2]'
          src={image}
          alt='cabin cover photo'
        />
        <div className='grid grid-cols-2 rounded-b-lg sm:rounded-none sm:rounded-r-xl overflow-hidden gap-[6px]'>
          <img src={images[0]?.url} alt='cabin interior photo 1' className='aspect-[3/2]' />
          <img src={images[1]?.url} alt='cabin interior photo 2' className='aspect-[3/2]' />
          <img src={images[2]?.url} alt='cabin interior photo 3' className='aspect-[3/2]' />
          <img src={images[3]?.url} alt='cabin interior photo 4' className='aspect-[3/2]' />
        </div>
      </div>

      <div className='grid grid-cols-[3fr_2fr] grid-rows-[auto_auto_auto_1fr_auto] gap-x-12'>
        <CabinTextInfo bedroom={bedroom} discount={discount} regularPrice={regularPrice} location={location} />
        <GuestsFavoriteBox reviews={reviews} />
        <FeatureIcon />
        <div className='grid grid-cols-2 gap-x-6 gap-y-4 mt-16'>
          <GuestReviewItem reviews={reviews} limit={4} />
        </div>
        <div className='flex'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='link' className='flex pl-0 mt-1 underline hover:no-underline'>
                See all reviews
              </Button>
            </DialogTrigger>
            <DialogContent className='h-[600px] overflow-auto'>
              <GuestsReviews />
            </DialogContent>
          </Dialog>

          <Dialog open={addReviewOpen} onOpenChange={setAddReviewOpen}>
            <DialogTrigger asChild>
              <Button variant='link' className='flex pl-0 mt-1 underline hover:no-underline'>
                Add review
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[400px]'>
              <GuestAddReview setOpen={setAddReviewOpen} />
            </DialogContent>
          </Dialog>
        </div>

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
      </div>
    </>
  );
}
