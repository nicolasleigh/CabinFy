import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <div className='flex justify-between  gap-2 mb-4 max-sm:flex-col'>
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
