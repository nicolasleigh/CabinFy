import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { ArrowDownAZ, ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowDownZA } from "lucide-react";

function CabinTableOperations() {
  return (
    <div className='flex gap-2 items-center'>
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "name-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Name</span>
                </p>
                <ArrowDownAZ strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "name-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Name</span>
                </p>
                <ArrowDownZA strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "regularPrice-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cBrand-100 text-cBrand-800 px-1 py-[2px] rounded-sm'>Price</span>
                </p>
                <ArrowDownNarrowWide strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "regularPrice-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cBrand-100 text-cBrand-800 px-1 py-[2px] rounded-sm'>Price</span>
                </p>
                <ArrowDownWideNarrow strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "location-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cGreen-100 text-cGreen-700 px-1 py-[2px] rounded-sm'>Location</span>
                </p>
                <ArrowDownAZ strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
          {
            value: "location-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <span className=''>Sort by </span>
                  <span className='bg-cGreen-100 text-cGreen-700 px-1 py-[2px] rounded-sm'>Location</span>
                </p>
                <ArrowDownZA strokeWidth={1.5} className='w-5' />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default CabinTableOperations;
