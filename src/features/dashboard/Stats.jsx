import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';

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
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat1>
        <Stat
          title='Bookings'
          color='blue'
          icon={<HiOutlineBriefcase />}
          value={numBookings}
        />
      </Stat1>

      <Stat2>
        <Stat
          title='Sales'
          color='green'
          icon={<HiOutlineBanknotes />}
          value={formatCurrency(sales)}
          className='stat2'
        />
      </Stat2>

      <Stat3>
        <Stat
          title='Check ins'
          color='indigo'
          icon={<HiOutlineCalendarDays />}
          value={checkins}
          className='stat3'
        />
      </Stat3>

      <Stat4>
        <Stat
          title='Occupancy rate'
          color='yellow'
          icon={<HiOutlineChartBar />}
          value={Math.round(occupation * 100) + '%'}
          className='stat4'
        />
      </Stat4>
    </>
  );
}

export default Stats;
