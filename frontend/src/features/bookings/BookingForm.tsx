import styled from "styled-components";
import DayPick from "../../ui/DayPick.tsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useEffect, useState } from "react";
import { useCreateBooking } from "./useCreateBooking.js";
import { differenceInDays } from "date-fns";
import { useSettings } from "../settings/useSettings.js";
import BookingBreakfastBox from "../../ui/BookingBreakfastBox.jsx";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
// import { Label } from "../../ui/BookingFormLabel.jsx";

// const Button = styled.button`
//   border-radius: 50%;
//   display: block;
//   width: 3rem;
//   height: 3rem;
//   border: 1px solid var(--color-grey-400);
//   color: var(--color-grey-500);

//   &:focus {
//     outline: none;
//   }

//   &:hover {
//     border: 1px solid var(--color-grey-600);
//   }
//   &:disabled {
//     border: 1px solid var(--color-grey-300);
//     color: var(--color-grey-300);
//   }

//   @media (max-width: 900px) {
//     width: 2.5rem;
//     height: 2.5rem;
//   }
// `;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  & {
    .number {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 900px) {
        font-size: 1.3rem;
      }
    }
  }
`;

const GuestsNumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const TotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;

  .beforeDiscount {
    text-decoration: line-through;

    font-size: 1.7rem;
    @media (max-width: 900px) {
      font-size: 1.4rem;
    }
  }
`;

const BookingBox = styled.div`
  padding: 2rem 3rem;
`;

const Booking = styled.button`
  display: block;
  width: 100%;
  padding: 1.6rem 0;
  border-radius: var(--border-radius-lg);
  border: none;
  background: rgb(195, 34, 34);
  background: linear-gradient(275deg, #d72727ec 0%, rgba(253, 45, 96, 0.9262298669467787) 100%);
  color: var(--color-red-50);
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }

  &:focus {
    outline: none;
  }

  &:active {
    animation: pulse 0.5s ease;
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
    padding: 1rem 3rem 0;
  }

  @media (max-width: 510px) {
    padding: 1rem 1rem 0;
  }

  @media (max-width: 450px) {
    padding: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-300);
  padding: 2rem 2.3rem;
  border-radius: var(--border-radius-xl);
  margin-top: 2rem;

  @media (max-width: 1000px) {
    padding: 0;
  }
`;

const FancyText = styled.div`
  background: rgb(246, 40, 32);
  background: linear-gradient(
    85deg,
    rgba(246, 40, 32, 0.6601234243697479) 0%,
    rgba(253, 45, 152, 0.8898153011204482) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 18%;
  background-position: 0 90%;

  font-size: 2rem;
  font-weight: 400;

  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

export default function BookingForm({
  guestsNumber,
  setGuestsNumber,
  hasBreakfast,
  setHasBreakfast,
  discount,
  regularPrice,
  cabinId,
  booking,
}) {
  const [selectedRange, setSelectedRange] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const { createBooking, isLoading } = useCreateBooking(cabinId);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings || {};

  const numOfNights = differenceInDays(selectedRange?.to, selectedRange?.from) + 1;

  const cabinPrice = regularPrice * numOfNights;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRange?.from || !selectedRange?.to) {
      toast.error("Please select a date range");
      return;
    }
    createBooking({
      guestsNumber,
      hasBreakfast,
      // selectedRange,
      fromValue,
      toValue,
      numOfNights,
      totalPrice,
      extrasPrice: hasBreakfast ? breakfastPrice * guestsNumber : 0,
      cabinPrice,
      discountPrice: discount ? cabinPrice * (discount / 100) : 0,
      cabinId,
      isPaid: false,
      status: "unconfirmed",
    });
    setSelectedRange();
    setToValue("");
    setFromValue("");
  };

  useEffect(() => {
    setTotalPrice(0);
    setPriceBeforeDiscount(0);
    if (numOfNights) {
      setTotalPrice(
        regularPrice * numOfNights * (1 - discount / 100) + (hasBreakfast ? breakfastPrice : 0) * guestsNumber
      );
      setPriceBeforeDiscount(regularPrice * numOfNights + (hasBreakfast ? breakfastPrice : 0) * guestsNumber);
    }
  }, [numOfNights, guestsNumber, hasBreakfast, breakfastPrice, discount, regularPrice]);

  const buttonGroupStyle =
    "w-8 h-8 flex items-center justify-center rounded-full border bg-cBrand-500 text-cBrand-50 disabled:bg-cGrey-200 disabled:text-cGrey-400 disabled:cursor-not-allowed";

  return (
    <div className='md:row-span-full md:col-start-2 mt-10 sm:mt-24'>
      <form className='mb-10 max-w-[400px] mx-auto' onSubmit={handleSubmit}>
        <div className='border-t pb-3 border-l border-r border-cGrey-300 rounded-t-md'>
          <DayPick
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            setToValue={setToValue}
            maxBookingLength={maxBookingLength}
            minBookingLength={minBookingLength}
            booking={booking}
          />
          <div className='px-8 py-2 flex items-center gap-1 justify-between'>
            <Label className='text-lg'>Number of Guests</Label>
            <div className='flex items-center gap-2'>
              <button
                className={buttonGroupStyle}
                type='button'
                onClick={() => setGuestsNumber((cur) => cur - 1)}
                disabled={guestsNumber === 1}
              >
                -
              </button>
              <span className='w-8 h-8  text-cBrand-500 rounded-sm flex justify-center items-center'>
                {guestsNumber}
              </span>
              <button
                className={buttonGroupStyle}
                type='button'
                onClick={() => setGuestsNumber((cur) => cur + 1)}
                disabled={guestsNumber === maxGuestsPerBooking}
              >
                +
              </button>
            </div>
          </div>
          {/* <BookingBreakfastBox hasBreakfast={hasBreakfast} setHasBreakfast={setHasBreakfast} />
           */}
          <div className='px-8 py-2 flex items-center gap-1 justify-between'>
            <Label className='text-lg'>Want breakfast?</Label>
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2 '>
                <Label htmlFor='yes' className='text-lg'>
                  Yes
                </Label>
                <Input
                  id='yes'
                  className='w-5'
                  type='checkbox'
                  onClick={() => setHasBreakfast(true)}
                  checked={hasBreakfast}
                  readOnly
                />
              </div>
              <div className='flex items-center gap-2'>
                <Label htmlFor='no' className='text-lg'>
                  No
                </Label>
                <Input
                  id='no'
                  className='w-5'
                  type='checkbox'
                  onClick={() => setHasBreakfast(false)}
                  checked={!hasBreakfast}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className='px-8 py-2 flex items-center gap-1 justify-between'>
            <Label className='text-lg'>Total Price</Label>
            <div className='space-y-1'>
              <div className='line-through text-cGrey-500 font-light text-center'>
                {Boolean(discount) && formatCurrency(priceBeforeDiscount)}
              </div>
              <div className='text-cRed-700 bg-cRed-50 px-2 rounded-sm text-xl'>{formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>
        <Button className='bg-cRed-500 text-cRed-50 w-full h-16 rounded-t-none text-xl hover:bg-cRed-700' type='submit'>
          Booking Now
        </Button>
      </form>
    </div>
  );
  // return (
  //   <FormSection>
  //     <Form onSubmit={handleSubmit}>
  //       <DayPick
  //         selectedRange={selectedRange}
  //         setSelectedRange={setSelectedRange}
  //         fromValue={fromValue}
  //         setFromValue={setFromValue}
  //         toValue={toValue}
  //         setToValue={setToValue}
  //         maxBookingLength={maxBookingLength}
  //         minBookingLength={minBookingLength}
  //         booking={booking}
  //       />
  //       <GuestsNumberBox>
  //         <Label>Number of Guests</Label>
  //         <ButtonGroup>
  //           <Button type='button' onClick={() => setGuestsNumber((cur) => cur - 1)} disabled={guestsNumber === 1}>
  //             -
  //           </Button>
  //           <span className='number'>{guestsNumber}</span>
  //           <Button
  //             type='button'
  //             onClick={() => setGuestsNumber((cur) => cur + 1)}
  //             disabled={guestsNumber === maxGuestsPerBooking}
  //           >
  //             +
  //           </Button>
  //         </ButtonGroup>
  //       </GuestsNumberBox>
  //       <BookingBreakfastBox hasBreakfast={hasBreakfast} setHasBreakfast={setHasBreakfast} />
  //       <TotalPriceBox>
  //         <Label>Total Price</Label>
  //         <div>
  //           <div className='beforeDiscount'>{Boolean(discount) && formatCurrency(priceBeforeDiscount)}</div>
  //           <FancyText>{formatCurrency(totalPrice)}</FancyText>
  //         </div>
  //       </TotalPriceBox>
  //       <BookingBox>
  //         <Booking>Booking</Booking>
  //       </BookingBox>
  //     </Form>
  //   </FormSection>
  // );
}
