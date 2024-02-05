import { format, isToday } from 'date-fns';
import {
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import styled from 'styled-components';

import DataItem from '../../ui/DataItem';

import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 500px) {
    padding: 0.8rem 1rem;
    gap: 1rem;
  }

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  p {
    font-size: 1.8rem;

    @media (max-width: 600px) {
      font-size: 1.6rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;

    @media (max-width: 600px) {
      font-size: 1.6rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 600px) {
    padding: 2.6rem 2.8rem 1.2rem;
  }

  @media (max-width: 500px) {
    padding: 2rem 0.8rem 0.5rem;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 600px) {
    padding: 1.2rem 2.6rem;
    font-size: 1.4rem;
  }

  @media (max-width: 500px) {
    padding: 0.6rem 1rem;
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    discountPrice,
    totalPrice,
    hasBreakfast,
    isPaid,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'yyyy-MM-dd')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'yyyy-MM-dd')}
        </p>
      </Header>

      <Section>
        <Guest>
          {/* {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />} */}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
        </Guest>

        {/* {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )} */}

        <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${cabinPrice} cabin - ${discountPrice} discount + ${extrasPrice} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEEE, yyyy-MM-dd, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
