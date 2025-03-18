import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import {
  ArrowDown,
  ArrowDownFromLine,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUp,
  ArrowUpFromLine,
  CalendarArrowDown,
  CalendarArrowUp,
  ChevronDown,
} from "lucide-react";

function BookingTableOperations() {
  return (
    <div className='flex gap-2 items-center'>
      <Filter
        filterField='status'
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Date</span>
                </p>
                <CalendarArrowDown strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "startDate-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Date</span>
                </p>
                <CalendarArrowUp strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "totalPrice-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cBrand-100 text-cBrand-700 px-1 py-[2px] rounded-sm'>Amount</span>
                </p>
                <ArrowDownWideNarrow strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "totalPrice-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cBrand-100 text-cBrand-700 px-1 py-[2px] rounded-sm'>Amount</span>
                </p>
                <ArrowDownNarrowWide strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default BookingTableOperations;
