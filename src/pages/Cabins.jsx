import { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import styled from 'styled-components';

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
