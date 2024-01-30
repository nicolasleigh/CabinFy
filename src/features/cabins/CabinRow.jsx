import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useDuplicateCabin } from './useDuplicateCabin';
import { imageBaseUrl } from '../../App';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 500px) {
    transform: scale(1.5);
  }
`;

const Cabin = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
  @media (max-width: 580px) {
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const Location = styled.div`
  font-size: 1.3rem;
  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
  @media (max-width: 580px) {
    font-size: 0.8rem;
  }
  @media (max-width: 500px) {
    font-size: 0.6rem;
  }
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;

  @media (max-width: 500px) {
    font-weight: 500;
    font-size: 0.8rem;
  }
`;

const Discount = styled.div`
  /* font-family: 'Sono'; */
  font-weight: 500;
  color: var(--color-green-700);

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  // const { isCreating, createCabin } = useCreateCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  const {
    id: cabinId,
    name,
    location,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    duplicateCabin({
      id: cabinId,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={imageBaseUrl + image} />
        <Cabin>{name}</Cabin>
        <Location>{location}</Location>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>up to {discount}%</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isDuplicating}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens='edit'>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens='delete'>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name='edit'>
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name='delete'>
                <ConfirmDelete
                  resourceName='cabins'
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
