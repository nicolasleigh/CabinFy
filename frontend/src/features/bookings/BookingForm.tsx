import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DayPick from "../../ui/DayPick.tsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useSettings } from "../settings/useSettings.js";
import { useCreateBooking } from "./useCreateBooking.js";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            <Label className='text-lg'>{t("numberOfGuests")}</Label>
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
            <Label className='text-lg'>{t("wantBreakfast")}</Label>
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2 '>
                <Label htmlFor='yes' className='text-lg'>
                  {t("Yes")}
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
                  {t("No")}
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
            <Label className='text-lg'>{t("totalPrice")}</Label>
            <div className='space-y-1'>
              <div className='line-through text-cGrey-500 font-light text-center'>
                {Boolean(discount) && formatCurrency(priceBeforeDiscount)}
              </div>
              <div className='text-cRed-700 bg-cRed-50 px-2 rounded-sm text-xl'>{formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>
        <Button className='bg-cRed-500 text-cRed-50 w-full h-16 rounded-t-none text-xl hover:bg-cRed-700' type='submit'>
          {t("bookingNow")}
        </Button>
      </form>
    </div>
  );
}
