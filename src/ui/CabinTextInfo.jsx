import styled from 'styled-components';
import { formatCurrency } from '../utils/helpers';

const Location = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.6rem; */
  padding: 2rem 0;
  background-color: var(--color-grey-100);

  & div:first-child {
    font-size: 2.6rem;
  }
`;

export default function CabinTextInfo({ bedroom, discount, regularPrice }) {
  return (
    <Location>
      <div>Located in: ArrowHead, California</div>

      <div>
        {bedroom}{' '}
        {Number(bedroom) === 1 ? <span>bedroom</span> : <span>bedrooms</span>}{' '}
        {Boolean(discount) && <span> &bull; {discount}% discount</span>} &bull;{' '}
        {formatCurrency(regularPrice)} night
      </div>
    </Location>
  );
}
