// import Row from '../ui/Row';
import { columns } from "@/components/table/BookingColumn";
import { DataTable } from "@/components/table/DataTable";
import { useBookings } from "@/features/bookings/useBookings";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useTranslation } from "react-i18next";

function Bookings() {
  const { bookings, isLoading, count } = useBookings();
  const { t } = useTranslation();
  // console.log(bookings);
  return (
    <>
      <div className='flex justify-between  max-md:flex-col gap-2 mb-4'>
        <h1 className='text-2xl font-semibold'>{t("bookingHeader")}</h1>
        <BookingTableOperations />
      </div>

      {/* <BookingTable /> */}
      <DataTable columns={columns} data={bookings || ""} count={count} showPagination={true} />
    </>
  );
}

export default Bookings;
