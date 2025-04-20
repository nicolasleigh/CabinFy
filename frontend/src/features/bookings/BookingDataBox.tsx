import { format, isToday } from "date-fns";
import { AiOutlineHome, AiOutlineCheckCircle, AiOutlineDollar } from "react-icons/ai";
import styled from "styled-components";

import DataItem from "../../ui/DataItem";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 500px) {
    padding: 0.8rem 1rem;
    gap: 1rem;
  }

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  p {
    font-size: 1.8rem;

    @media (max-width: 600px) {
      font-size: 1.6rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  & span {
    /* font-family: 'Sono'; */
    font-size: 2rem;
    margin-left: 4px;

    @media (max-width: 600px) {
      font-size: 1.6rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 600px) {
    padding: 2.6rem 2.8rem 1.2rem;
  }

  @media (max-width: 500px) {
    padding: 2rem 0.8rem 0.5rem;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) => (props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)")};
  color: ${(props) => (props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)")};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 600px) {
    padding: 1.2rem 2.6rem;
    font-size: 1.4rem;
  }

  @media (max-width: 500px) {
    padding: 0.6rem 1rem;
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    discountPrice,
    totalPrice,
    hasBreakfast,
    isPaid,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  } = booking;

  return (
    <div className=' bg-cGrey-50 '>
      <div className='rounded-t-md h-36 max-md:h-28 max-sm:h-20 bg-cBrand-500 text-cBrand-100 px-4 flex flex-col justify-center gap-2'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center text-xl gap-4 max-md:text-lg max-sm:text-base'>
            <AiOutlineHome />
            <p>
              {numNights} Nights in Cabin <span className='bg-cBrand-700 rounded-md px-2 py-1'>{cabinName}</span>
            </p>
          </div>
        </div>
        <p className='text-xl max-md:text-lg max-sm:text-sm text-cBrand-200 self-end'>
          From {format(new Date(startDate), "yyyy-MM-dd")} (
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}) To{" "}
          {format(new Date(endDate), "yyyy-MM-dd")}
        </p>
      </div>

      <div className='pt-8 px-8 max-sm:px-3 max-sm:pt-4 flex flex-col gap-5'>
        <div className='flex gap-2 text-cGrey-500 max-sm:text-sm'>
          <p className='text-cGrey-700 font-semibold'>
            {guestName}
            <span className='ml-2 text-muted-foreground font-normal'>
              ( <span className='bg-cBrand-200 text-cBrand-700 px-1 py-[1px] rounded-sm'>{numGuests}</span>{" "}
              {numGuests === 1 ? "Guest" : "Guests"})
            </span>
          </p>
          <span>&bull;</span>
          <p>{email}</p>
        </div>

        <div className='flex items-center gap-4 max-sm:text-sm'>
          {hasBreakfast ? (
            <CircleCheck className='text-cBrand-600 w-6 h-6' />
          ) : (
            <CircleX className='text-cRed-600 w-6 h-6' />
          )}

          <p>Breakfast included?</p>
          <span
            className={cn(
              hasBreakfast ? "bg-cBrand-500 text-cBrand-100" : "bg-cRed-600 text-cRed-50",
              "font-semibold rounded-sm py-1 px-2 text-sm"
            )}
          >
            {hasBreakfast ? "Yes" : "No"}
          </span>
        </div>

        <div
          className={cn(
            isPaid ? "bg-cGreen-100 text-cGreen-700" : "bg-cYellow-100 text-cYellow-700",
            "py-8 px-5 max-md:py-4 max-md:px-2 rounded-sm flex justify-between "
          )}
        >
          <div className='flex items-center gap-4 max-md:text-sm max-sm:text-[10px]'>
            <AiOutlineDollar className={cn(isPaid ? "text-cGreen-700" : "text-cYellow-700 ", "w-6 h-6")} />
            <span>Total price</span>
            {formatCurrency(totalPrice)}

            {hasBreakfast && ` (${cabinPrice} cabin - ${discountPrice} discount + ${extrasPrice} breakfast)`}
          </div>

          <p className='text-base max-md:text-sm font-semibold max-sm:text-[10px]'>
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </div>

      <div className='text-end text-muted-foreground py-4 px-8 text-sm max-sm:text-[10px]'>
        <p>Booked {format(new Date(created_at), "EEEE, yyyy-MM-dd, p")}</p>
      </div>
    </div>
  );
}

export default BookingDataBox;
