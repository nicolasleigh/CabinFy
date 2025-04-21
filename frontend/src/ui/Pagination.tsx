import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

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
        Showing{" "}
        <span className='bg-cBrand-100 text-cBrand-700 font-semibold border rounded-md px-2 py-1'>
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className='bg-cBrand-100 text-cBrand-700 border font-semibold rounded-md px-2 py-1'>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>

      <div className='flex gap-4 max-sm:gap-2 items-center'>
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-2 pr-4 gap-1 bg-muted max-sm:text-xs '
          variant='ghost'
        >
          <ChevronLeft />
          <span className=''>Prev</span>
        </Button>
        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-4 pr-2 gap-1 bg-muted max-sm:text-xs'
          variant='ghost'
        >
          <span>Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
