import styled from "styled-components";
import Modal from "../../ui/Modal";
import GuestsReviews from "./GuestsReviews";
// import { IoMdStar } from 'react-icons/io';
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const GuestsFavorite = styled.div`
  display: flex;
  padding: 2rem 2.3rem;
  /* margin-top: 2rem; */
  gap: 1.4rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-grey-300);
  grid-column: 1/2;
  grid-row: 2/3;
  width: 94%;

  @media (max-width: 1000px) {
    padding: 1rem 1rem;
    gap: 1rem;
  }
  @media (max-width: 830px) {
    grid-column: 1/-1;
    margin: 0 auto;
  }

  @media (max-width: 450px) {
    padding: 1rem 0.5rem;
    gap: 0;
    width: 100%;
  }
`;

const ReviewLayout = styled(Link)`
  display: flex;
  gap: 0.6rem;
`;

const Favorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-red-600);
  font-weight: 600;
  text-align: center;

  & span:last-child {
    @media (max-width: 380px) {
      font-size: 1rem;
    }
  }
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  border-right: 1px solid var(--color-grey-200);

  @media (max-width: 450px) {
    padding-right: 0.3rem;
  }

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;

      @media (max-width: 450px) {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    &:last-child {
      font-size: 1.4rem;
      display: flex;
      align-items: center;

      @media (max-width: 450px) {
        font-size: 1.2rem;
      }
    }
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;

  @media (max-width: 450px) {
    padding-left: 0.3rem;
  }

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;

      @media (max-width: 450px) {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    &:last-child {
      font-size: 1.2rem;
      text-decoration: underline;

      @media (max-width: 450px) {
        font-size: 1rem;
      }
    }
  }
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 380px) {
    font-size: 1.3rem;
  }
`;

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
