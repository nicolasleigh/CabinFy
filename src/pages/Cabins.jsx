import styled from 'styled-components';
import AddCabin from '../features/cabins/AddCabin';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

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
      <HeaderRow type='horizontal'>
        <Heading as='h1' className='heading'>
          All cabins
        </Heading>
        <CabinTableOperations />
      </HeaderRow>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
