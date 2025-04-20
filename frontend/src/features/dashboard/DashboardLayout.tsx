import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1000px) {
    gap: 1.2rem;
  }
  @media (max-width: 800px) {
    gap: 0.7rem;
  }

  @media (max-width: 650px) {
    gap: 0.4rem;
  }

  @media (max-width: 500px) {
    grid-template-rows: auto auto 34rem auto;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  // console.log(bookings);

  return (
    <div className='grid grid-cols-4 max-md:grid-cols-2 gap-x-2 gap-y-4 grid-rows-[auto_18rem_auto] max-md:grid-rows-[auto_auto_18rem_auto] max-sm:grid-rows-[auto_auto_auto_auto_18rem_auto]  mb-5'>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
