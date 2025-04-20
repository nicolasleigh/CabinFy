import { LuWallet, LuCalendarCheck2 } from "react-icons/lu";
import { AiOutlineTransaction, AiFillSignal } from "react-icons/ai";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import { Wallet } from "lucide-react";

const Stat1 = styled.div`
  @media (max-width: 500px) {
    grid-column: 1 / 3;
  }
`;
const Stat2 = styled.div`
  @media (max-width: 500px) {
    grid-column: 3 / 5;
  }
`;
const Stat3 = styled.div`
  @media (max-width: 500px) {
    grid-column: 1 / 3;
  }
`;
const Stat4 = styled.div`
  @media (max-width: 500px) {
    grid-column: 3 / 5;
  }
`;

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
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
          title='Bookings'
          color='blue'
          icon={<LuWallet className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={numBookings}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title='Sales'
          color='green'
          icon={<AiOutlineTransaction className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={formatCurrency(sales)}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title='Check ins'
          color='indigo'
          icon={<LuCalendarCheck2 className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={checkins}
        />
      </div>

      <div className='max-sm:col-span-2'>
        <Stat
          title='Occupancy rate'
          color='yellow'
          icon={<AiFillSignal className='max-lg:w-6 max-lg:h-6 w-8 h-8' />}
          value={Math.round(occupation * 100) + "%"}
        />
      </div>
    </>
  );
}

export default Stats;
