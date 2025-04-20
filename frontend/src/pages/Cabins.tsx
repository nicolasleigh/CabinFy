import styled from "styled-components";
import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;

    .heading {
      align-self: flex-start;
    }
  }

  /* @media (max-width: 580px) {
    gap: 0.3rem;
  } */
`;

function Cabins() {
  return (
    <>
      <div className='flex justify-between items-center gap-2 mb-4'>
        <h1 className='text-2xl font-semibold'>All cabins</h1>
        <CabinTableOperations />
      </div>

      <div className='flex flex-col gap-4 mb-5'>
        <CabinTable />
        <div>
          <AddCabin />
        </div>
      </div>
    </>
  );
}

export default Cabins;
