import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? " var(--color-brand-600)" : "var(--color-grey-50)")};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 880px) {
    font-size: 1.2rem;
  }
  @media (max-width: 670px) {
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

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
    <div className='flex items-center justify-between my-4'>
      <p>
        Showing{" "}
        <span className='bg-cBrand-500 text-cBrand-50 border rounded-md px-2 py-1'>
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className='bg-cBrand-500 text-cBrand-50 border rounded-md px-2 py-1'>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>

      <div className='flex gap-4 items-center'>
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-2 pr-4 gap-1 bg-muted'
          variant='ghost'
        >
          <ChevronLeft />
          <span>Prev</span>
        </Button>
        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className='hover:bg-cBrand-500 hover:text-cBrand-50 pl-4 pr-2 gap-1 bg-muted'
          variant='ghost'
        >
          <span>Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
  // return (
  //   <StyledPagination>
  //     <p>
  //       Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
  //       <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
  //     </p>

  //     <Buttons>
  //       <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
  //         <AiOutlineLeft /> <span>Previous</span>
  //       </PaginationButton>
  //       <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
  //         <span>Next</span>
  //         <AiOutlineRight />
  //       </PaginationButton>
  //     </Buttons>
  //   </StyledPagination>
  // );
}

export default Pagination;
