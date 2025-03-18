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
  console.log(cabins);

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  // console.log(filterValue);

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins;

  if (typeof filteredCabins[0][field] === "number") {
    sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }
  if (typeof filteredCabins[0][field] === "string") {
    sortedCabins = filteredCabins.sort((a, b) => a[field].localeCompare(b[field]) * modifier);
  }

  return (
    <>
      {/* <Menus>
        <Table columns='0.6fr 1.8fr 2fr 1fr 1fr 1.5rem'>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Location</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
        </Table>
      </Menus> */}
      <DataTable columns={columns} data={sortedCabins} />
    </>
  );
  // return (
  //   <Menus>
  //     <Table columns='0.6fr 1.8fr 2fr 1fr 1fr 1.5rem'>
  //       <Table.Header>
  //         <div></div>
  //         <div>Cabin</div>
  //         <div>Location</div>
  //         <div>Price</div>
  //         <div>Discount</div>
  //         <div></div>
  //       </Table.Header>

  //       <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
  //     </Table>
  //   </Menus>
  // );
}
export default CabinTable;
