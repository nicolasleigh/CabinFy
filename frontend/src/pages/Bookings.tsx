import Heading from "../ui/Heading";
// import Row from '../ui/Row';
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import styled from "styled-components";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/BookingColumn";
import { useBookings } from "@/features/bookings/useBookings";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 880px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;

    .heading {
      align-self: flex-start;
    }
  }

  @media (max-width: 580px) {
    gap: 0.3rem;
  }
`;

function Bookings() {
  const { bookings, isLoading, count } = useBookings();
  console.log(bookings);
  return (
    <>
      <div className='flex justify-between items-center gap-2 mb-4'>
        {/* <Heading className='heading' as='h1'>
          All bookings
        </Heading> */}
        <h1 className='text-2xl font-semibold'>All bookings</h1>
        <BookingTableOperations />
      </div>

      {/* <BookingTable /> */}
      <DataTable columns={columns} data={bookings || ""} count={count} />
    </>
  );
}

export default Bookings;
