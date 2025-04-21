// import Row from '../ui/Row';
import { columns } from "@/components/table/BookingColumn";
import { DataTable } from "@/components/table/DataTable";
import { useBookings } from "@/features/bookings/useBookings";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  const { bookings, isLoading, count } = useBookings();
  // console.log(bookings);
  return (
    <>
      <div className='flex justify-between  max-md:flex-col gap-2 mb-4'>
        <h1 className='text-2xl font-semibold'>All bookings</h1>
        <BookingTableOperations />
      </div>

      {/* <BookingTable /> */}
      <DataTable columns={columns} data={bookings || ""} count={count} showPagination={true} />
    </>
  );
}

export default Bookings;
