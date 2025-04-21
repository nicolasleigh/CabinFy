import GuestsReviews from "./GuestsReviews";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiFillStar } from "react-icons/ai";

export default function GuestsFavoriteBox({ reviews }) {
  const averageRating =
    reviews?.reduce((acc, review) => {
      return acc + review?.rating;
    }, 0) / reviews?.length;
  return averageRating >= 3 ? (
    <div className=' border flex items-center gap-1 justify-between rounded-md px-1 sm:px-5 py-1 sm:py-4'>
      <div className='text-xs font-medium text-cRed-600 sm:font-semibold flex flex-col items-center'>
        <span>🎉</span>
        <span className='text-center'>Guests Favorite</span>
      </div>
      <div className='font-semibold text-center text-xs sm:text-base '>One of the most loved cabins</div>
      <Dialog>
        <DialogTrigger>
          <div className='flex'>
            <div className='flex justify-center flex-col border-r pr-2'>
              <p className='text-sm sm:text-lg md:text-xl font-semibold'>{Math.ceil(averageRating * 10) / 10}</p>
              <p className='flex'>
                {Array.from([1, 2, 3, 4, 5]).map((e) => (
                  <AiFillStar key={e} className='w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ' />
                ))}
              </p>
            </div>
            <div className='flex justify-center flex-col pl-2'>
              <p className='text-sm sm:text-lg md:text-xl font-semibold'>{reviews?.length}</p>
              <p className='font-semibold text-xs md:text-sm leading-none'>reviews</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='h-[600px] overflow-auto'>
          <GuestsReviews />
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
