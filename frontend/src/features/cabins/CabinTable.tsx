import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/CabinColumn";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  // console.log(cabins);

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;
  // if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins;
  // console.log(filteredCabins);

  if (typeof filteredCabins[0][field] === "number") {
    sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }
  if (typeof filteredCabins[0][field] === "string") {
    sortedCabins = filteredCabins.sort((a, b) => a[field].localeCompare(b[field]) * modifier);
  }
  // console.log(sortedCabins);

  return (
    <>
      <DataTable columns={columns} data={sortedCabins} />
    </>
  );
}
export default CabinTable;
