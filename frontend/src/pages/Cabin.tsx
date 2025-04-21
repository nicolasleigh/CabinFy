import { Suspense, lazy, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import GuestAddReview from "@/features/guests/GuestAddReview";
import GuestsReviews from "@/features/guests/GuestsReviews";
import { useBookingByCabinId } from "../features/bookings/useBookingByCabinId";
import { useCabin } from "../features/cabins/useCabin";
import GuestReviewItem from "../features/guests/GuestReviewItem";
import GuestsFavoriteBox from "../features/guests/GuestsFavoriteBox";
import { useReviews } from "../features/guests/useReviews";
import CabinSkeleton from "../ui/CabinSkeleton";
import CabinTextInfo from "../ui/CabinTextInfo";
import FeatureIcon from "../ui/FeatureIcon";
import Skeleton from "../ui/Skeleton";

const BookingForm = lazy(() => import("../features/bookings/BookingForm"));

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
      <div className='text-xl md:text-2xl lg:text-3xl font-semibold'>{name}</div>

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

      <div className='grid grid-cols-1 md:grid-cols-[3fr_2fr] md:grid-rows-[auto_auto_auto_1fr_auto] md:gap-x-5 lg:gap-x-12'>
        <CabinTextInfo bedroom={bedroom} discount={discount} regularPrice={regularPrice} location={location} />
        <GuestsFavoriteBox reviews={reviews} />
        <FeatureIcon />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 sm:gap-x-6 gap-y-4 mt-10 sm:mt-16'>
          <GuestReviewItem reviews={reviews} limit={4} />
        </div>
        <div className='flex'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='link' className='flex pl-0 mt-1 underline hover:no-underline'>
                See all reviews
              </Button>
            </DialogTrigger>
            <DialogContent className='h-[500px] overflow-auto'>
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
