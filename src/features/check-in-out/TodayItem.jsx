import styled from 'styled-components';
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 8rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 900px) {
    grid-template-columns: 6rem 1fr 5rem 6rem;
    font-size: 1.2rem;
    /* grid-template-columns: 9rem 1fr 9rem 9rem; */

    .btn {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }

    .tag {
      font-size: 1rem;
      padding: 0.3rem 0.5rem;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Nights = styled.div`
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

function TodayItem({ activity }) {
  const { id, status, guest, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && (
        <Tag className='tag' type='green'>
          Arriving
        </Tag>
      )}
      {status === 'checked-in' && (
        <Tag className='tag' type='blue'>
          Departing
        </Tag>
      )}

      {/* <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} /> */}
      <Guest>{guest.fullName}</Guest>
      <Nights>{numNights} nights</Nights>

      {status === 'unconfirmed' && (
        <Button
          className='btn'
          size='small'
          variation='primary'
          as={Link}
          to={`/admin/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
