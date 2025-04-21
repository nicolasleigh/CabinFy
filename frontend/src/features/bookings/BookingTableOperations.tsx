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
import { Trans, useTranslation } from "react-i18next";

function BookingTableOperations() {
  const { t } = useTranslation();
  return (
    <div className='flex gap-2  max-sm:flex-col'>
      <Filter
        filterField='status'
        options={[
          { value: "all", label: t("allFilter") },
          { value: "checked-out", label: t("checkedOutFilter") },
          { value: "checked-in", label: t("checkedInFilter") },
          { value: "unconfirmed", label: t("unconfirmedFilter") },
        ]}
      />

      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <Trans i18nKey='sortByDate'>
                    Sort by <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Date</span>
                  </Trans>
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
                  <Trans i18nKey='sortByDate'>
                    Sort by <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Date</span>
                  </Trans>
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
                  <Trans i18nKey='sortByAmount'>
                    Sort by <span className='bg-cBrand-100 text-cBrand-700 px-1 py-[2px] rounded-sm'>Amount</span>
                  </Trans>
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
                  <Trans i18nKey='sortByAmount'>
                    Sort by <span className='bg-cBrand-100 text-cBrand-700 px-1 py-[2px] rounded-sm'>Amount</span>
                  </Trans>
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
