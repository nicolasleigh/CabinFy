import { AiFillSignal, AiOutlineTransaction } from "react-icons/ai";
import { LuCalendarCheck2, LuWallet } from "react-icons/lu";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { useTranslation } from "react-i18next";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const { t } = useTranslation();
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <div className='max-sm:col-span-2'>
        <Stat
          title={t("statBookings")}
          color='blue'
          icon={<LuWallet className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={numBookings}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title={t("statSales")}
          color='green'
          icon={<AiOutlineTransaction className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={formatCurrency(sales)}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title={t("statCheckin")}
          color='indigo'
          icon={<LuCalendarCheck2 className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={checkins}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title={t("statOccupancyRate")}
          color='yellow'
          icon={<AiFillSignal className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={Math.round(occupation * 100) + "%"}
        />
      </div>
    </>
  );
}

export default Stats;
