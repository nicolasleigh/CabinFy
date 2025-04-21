import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { ArrowDownAZ, ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowDownZA } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

function CabinTableOperations() {
  const { t } = useTranslation();
  return (
    <div className='flex gap-2  max-sm:flex-col'>
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: t("allFilter") },
          { value: "no-discount", label: t("noDiscountFilter") },
          { value: "with-discount", label: t("withDiscountFilter") },
        ]}
      />

      <SortBy
        options={[
          {
            value: "name-asc",
            label: (
              <div className='flex items-center gap-2'>
                <p>
                  <Trans i18nKey='sortByCabinName'>
                    Sort by <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Name</span>
                  </Trans>
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
                  <Trans i18nKey='sortByCabinName'>
                    Sort by <span className='bg-cRed-100 text-cRed-800 px-1 py-[2px] rounded-sm'>Name</span>
                  </Trans>
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
                  <Trans i18nKey='sortByCabinPrice'>
                    Sort by <span className='bg-cBrand-100 text-cBrand-800 px-1 py-[2px] rounded-sm'>Price</span>
                  </Trans>
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
                  <Trans i18nKey='sortByCabinPrice'>
                    Sort by <span className='bg-cBrand-100 text-cBrand-800 px-1 py-[2px] rounded-sm'>Price</span>
                  </Trans>
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
                  <Trans i18nKey='sortByCabinLocation'>
                    Sort by <span className='bg-cGreen-100 text-cGreen-700 px-1 py-[2px] rounded-sm'>Location</span>
                  </Trans>
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
                  <Trans i18nKey='sortByCabinLocation'>
                    Sort by <span className='bg-cGreen-100 text-cGreen-700 px-1 py-[2px] rounded-sm'>Location</span>
                  </Trans>
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
