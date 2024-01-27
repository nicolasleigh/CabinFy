import styled from 'styled-components';
import DayPick from '../../ui/DayPick';
import { formatCurrency } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import { useCreateBooking } from './useCreateBooking';
import { differenceInDays } from 'date-fns';
import { useSettings } from '../settings/useSettings';
import BookingBreakfastBox from '../../ui/BookingBreakfastBox';

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
    }
  }
`;

const GuestsNumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const TotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;

  div {
    font-size: 2rem;
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }

  .beforeDiscount {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
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
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-300);
  padding: 2rem 2.3rem;
  border-radius: var(--border-radius-xl);
  margin-top: 2rem;
`;

const FormSection = styled.div``;

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
          <div className='beforeDiscount'>
            {Boolean(discount) && formatCurrency(priceBeforeDiscount)}
          </div>
          <div>{formatCurrency(totalPrice)}</div>
        </TotalPriceBox>
        <BookingBox>
          <Booking>Booking</Booking>
        </BookingBox>
      </Form>
    </FormSection>
  );
}
