import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useEffect, useState } from "react";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const mediaMatch = window.matchMedia("(max-width: 580px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("change", handler);
  });

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName='bookings' />;

  return (
    <Menus>
      <Table columns={matches ? "1.5fr 2fr 1.3fr 1fr 1rem" : "1.5fr 2fr 2.4fr 1.3fr 1fr 1.5rem"}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          {!matches && <div>Dates</div>}
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
