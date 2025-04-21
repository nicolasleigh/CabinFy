import { format, isToday } from "date-fns";
import { AiOutlineDollar, AiOutlineHome } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { zhCN } from "date-fns/locale";

// A purely presentational component
function BookingDataBox({ booking }) {
  const { t, i18n } = useTranslation();
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
              {t("cabinNightsNum", { num: numNights })}
              <span className='bg-cBrand-700 rounded-md px-2 py-1'>{cabinName}</span>
            </p>
          </div>
        </div>
        <p className='text-xl max-md:text-lg max-sm:text-sm text-cBrand-200 self-end'>
          {t("fromTime")} {format(new Date(startDate), "yyyy-MM-dd")} {t("toTime")}{" "}
          {format(new Date(endDate), "yyyy-MM-dd")}
        </p>
      </div>

      <div className='pt-8 px-8 max-sm:px-3 max-sm:pt-4 flex flex-col gap-5'>
        <div className='flex gap-2 text-cGrey-500 max-sm:text-sm'>
          <p className='text-cGrey-700 font-semibold'>
            {guestName}
            <span className='ml-2 text-muted-foreground font-normal'>
              ( <span className='bg-cBrand-200 text-cBrand-700 px-1 py-[1px] rounded-sm'>{numGuests}</span>{" "}
              {numGuests === 1 ? t("oneGuest") : t("guests")})
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

          <p>{t("breakfastIncluded")}</p>
          <span
            className={cn(
              hasBreakfast ? "bg-cBrand-500 text-cBrand-100" : "bg-cRed-600 text-cRed-50",
              "font-semibold rounded-sm py-1 px-2 text-sm"
            )}
          >
            {hasBreakfast ? t("Yes") : t("No")}
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
            <span>{t("totalPrice")}</span>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${cabinPrice} ${t("detailCabinPrice")} - ${discountPrice} ${t(
                "detailDiscountPrice"
              )} + ${extrasPrice} ${t("detailBreakfastPrice")})`}
          </div>

          <p className='text-base max-md:text-sm font-semibold max-sm:text-[10px]'>
            {isPaid ? t("detailPaid") : t("detailNotPaid")}
          </p>
        </div>
      </div>

      <div className='text-end text-muted-foreground py-4 px-8 text-sm max-sm:text-[10px]'>
        {i18n.language === "zh" ? (
          <p>{format(new Date(created_at), "EEEE, yyyy-MM-dd, p", { locale: zhCN })}</p>
        ) : (
          <p>{format(new Date(created_at), "EEEE, yyyy-MM-dd, p")}</p>
        )}
      </div>
    </div>
  );
}

export default BookingDataBox;
