import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import { Trans, useTranslation } from "react-i18next";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end = currentPage === pageCount ? count : currentPage * PAGE_SIZE;
  const { t } = useTranslation();

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className='flex items-center justify-between my-4 max-md:text-sm max-sm:text-[12px]'>
      <p>
        <Trans
          i18nKey='showingResults'
          values={{ start, end, total: count }}
          components={{
            1: <span className='bg-cBrand-100 text-cBrand-700 font-semibold border rounded-md px-2 py-1' />,
          }}
        />
      </p>

      <div className='flex gap-4 max-sm:gap-2 items-center'>
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-2 pr-4 gap-1 bg-muted max-sm:text-xs '
          variant='ghost'
        >
          <ChevronLeft />
          <span className=''>{t("prevButton")}</span>
        </Button>
        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-4 pr-2 gap-1 bg-muted max-sm:text-xs'
          variant='ghost'
        >
          <span>{t("nextButton")}</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
