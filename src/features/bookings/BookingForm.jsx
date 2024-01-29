import styled from 'styled-components';
import DayPick from '../../ui/DayPick';
import { formatCurrency } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import { useCreateBooking } from './useCreateBooking';
import { differenceInDays } from 'date-fns';
import { useSettings } from '../settings/useSettings';
import BookingBreakfastBox from '../../ui/BookingBreakfastBox';
import toast from 'react-hot-toast';
import { Label } from '../../ui/BookingFormLabel';

const Button = styled.button`
  border-radius: 50%;
  display: block;
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-grey-400);

  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid var(--color-grey-600);
  }
  &:disabled {
    border: 1px solid var(--color-grey-300);
    color: var(--color-grey-300);
  }

  @media (max-width: 900px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

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
    /* text-decoration: line-through;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--color-grey-400); */
    /* background: rgb(134, 24, 1);
    background: linear-gradient(
      85deg,
      rgba(134, 24, 1, 0.9318321078431373) 0%,
      rgba(226, 11, 11, 0.8702074579831933) 100%
    );
    background-repeat: no-repeat;
    background-size: 100% 18%;
    background-position: 50% 50%; */
    text-decoration: line-through;

    font-size: 1.7rem;
    @media (max-width: 900px) {
      font-size: 1.4rem;
    }
    /* font-weight: 400; */
  }
`;

const BookingBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  padding: 2rem 3rem;
`;

const Booking = styled.button`
  display: block;
  width: 100%;
  padding: 1.6rem 0;
  border-radius: var(--border-radius-lg);
  border: none;
  background: rgb(195, 34, 34);
  background: linear-gradient(
    275deg,
    #d72727ec 0%,
    rgba(253, 45, 96, 0.9262298669467787) 100%
  );
  color: var(--color-grey-100);
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
  breakfast,
  setBreakfast,
  discount,
  regularPrice,
  cabinId,
}) {
  const [selectedRange, setSelectedRange] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const { createBooking, isLoading } = useCreateBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const numOfNights =
    differenceInDays(selectedRange?.to, selectedRange?.from) + 1;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRange?.from || !selectedRange?.to) {
      toast.error('Please select a date range');
      return;
    }
    createBooking({
      guestsNumber,
      breakfast,
      selectedRange,
      numOfNights,
      totalPrice,
      extrasPrice: breakfast ? breakfastPrice * guestsNumber : 0,
      cabinPrice: regularPrice * numOfNights,
      cabinId,
      isPaid: false,
      status: 'unconfirmed',
    });
  };

  useEffect(() => {
    setTotalPrice(0);
    setPriceBeforeDiscount(0);
    if (numOfNights) {
      setTotalPrice(
        regularPrice * numOfNights * (1 - discount / 100) +
          (breakfast ? breakfastPrice : 0) * guestsNumber
      );
      setPriceBeforeDiscount(
        regularPrice * numOfNights +
          (breakfast ? breakfastPrice : 0) * guestsNumber
      );
    }
  }, [
    numOfNights,
    guestsNumber,
    breakfast,
    breakfastPrice,
    discount,
    regularPrice,
  ]);
  return (
    <FormSection>
      <Form onSubmit={handleSubmit}>
        <DayPick
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          fromValue={fromValue}
          setFromValue={setFromValue}
          toValue={toValue}
          setToValue={setToValue}
          maxBookingLength={maxBookingLength}
        />
        <GuestsNumberBox>
          <Label>Number of Guests</Label>
          <ButtonGroup>
            <Button
              type='button'
              onClick={() => setGuestsNumber((cur) => cur - 1)}
              disabled={guestsNumber === 1}
            >
              -
            </Button>
            <span className='number'>{guestsNumber}</span>
            <Button
              type='button'
              onClick={() => setGuestsNumber((cur) => cur + 1)}
              disabled={guestsNumber === maxGuestsPerBooking}
            >
              +
            </Button>
          </ButtonGroup>
        </GuestsNumberBox>
        <BookingBreakfastBox
          breakfast={breakfast}
          setBreakfast={setBreakfast}
        />
        <TotalPriceBox>
          <Label>Total Price</Label>
          <div>
            <div className='beforeDiscount'>
              {Boolean(discount) && formatCurrency(priceBeforeDiscount)}
            </div>
            <FancyText>{formatCurrency(totalPrice)}</FancyText>
          </div>
        </TotalPriceBox>
        <BookingBox>
          <Booking>Booking</Booking>
        </BookingBox>
      </Form>
    </FormSection>
  );
}
