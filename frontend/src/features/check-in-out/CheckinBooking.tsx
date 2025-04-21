import BookingDataBox from "../bookings/BookingDataBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
import { useTranslation } from "react-i18next";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { t } = useTranslation();

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
        <h1 className='text-xl font-semibold'>{t("checkinBookingHeader", { bookingId })}</h1>
        <Button variant='link' className='text-cBrand-500' onClick={moveBack}>
          &larr; {t("backButton")}
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
            {t("wantToAddBreakfast", { price: formatCurrency(optionalBreakfastPrice) })}
            {/* Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}? */}
          </Label>
        </div>
      )}
      <div className='bg-cGrey-50 flex gap-2 items-center px-8 pb-4'>
        <Input
          type='checkbox'
          className='w-7 max-sm:w-5'
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'
        />
        <Label htmlFor='confirm' className='text-lg max-md:text-base max-sm:text-sm text-cGrey-700'>
          {t("confirmPayPrice", { name: guest.fullName })}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Label>
      </div>

      <div className='flex items-center justify-end gap-2 mt-4 mb-4'>
        <Button
          className='bg-cBrand-500 hover:bg-cBrand-600 text-cBrand-100'
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          {t("checkinBookingButton", { bookingId })}
        </Button>
        <Button variant='secondary' onClick={moveBack}>
          {t("backButton")}
        </Button>
      </div>
    </>
  );
}

export default CheckinBooking;
