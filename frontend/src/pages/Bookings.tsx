import Heading from '../ui/Heading';
// import Row from '../ui/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 880px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;

    .heading {
      align-self: flex-start;
    }
  }

  @media (max-width: 580px) {
    gap: 0.3rem;
  }
`;

function Bookings() {
  return (
    <>
      <Row>
        <Heading className='heading' as='h1'>
          All bookings
        </Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
