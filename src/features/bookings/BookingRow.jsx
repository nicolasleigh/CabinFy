import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);

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

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;

    @media (max-width: 500px) {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;

    @media (max-width: 880px) {
      font-size: 1rem;
    }

    @media (max-width: 670px) {
      font-size: 0.8rem;
    }

    @media (max-width: 500px) {
      font-size: 0.7rem;
    }
  }
`;

const Dates = styled.div`
  @media (max-width: 580px) {
    display: none;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;

  @media (max-width: 880px) {
    font-size: 1.2rem;
  }

  @media (max-width: 670px) {
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Dates>
        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)}{' '}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
            {format(new Date(endDate), 'MMM dd yyyy')}
          </span>
        </Stacked>
      </Dates>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/admin/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/admin/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
