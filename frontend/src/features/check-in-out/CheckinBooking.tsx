import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const { id: bookingId, guest, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='text-2xl font-semibold'>Check in booking #{bookingId}</h1>
        <Button variant='link' className='text-cBrand-500' onClick={moveBack}>
          &larr; Back
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className='bg-cGrey-50 flex gap-2 items-center px-8 pb-4'>
          <Input
            id='breakfast'
            type='checkbox'
            className='w-7'
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          />
          <Label htmlFor='breakfast' className='text-lg text-cGrey-700'>
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Label>
          {/* <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox> */}
        </div>
      )}
      <div className='bg-cGrey-50 flex gap-2 items-center px-8 pb-4'>
        <Input
          type='checkbox'
          className='w-7'
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'
        />
        <Label htmlFor='confirm' className='text-lg text-cGrey-700'>
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Label>
        {/* <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox> */}
      </div>

      <div className='flex items-center justify-end gap-2 mt-4'>
        <Button
          className='bg-cBrand-500 hover:bg-cBrand-600 text-cBrand-100'
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variant='secondary' onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
}

export default CheckinBooking;
