import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';

const CardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  color: var(--color-grey-700);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const CardImg = styled.img`
  display: block;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  border: 1px solid var(--color-grey-200);

  /* outline: 2px solid var(--color-grey-100); */
`;

const CardTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.6rem;
  width: 100%;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const CardNameBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardRate = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
`;
const CardTextBed = styled.div`
  display: flex;
  gap: 0.4rem;
  color: var(--color-grey-400);
`;
const CardPrice = styled.div`
  margin-top: 0.6rem;
`;
const CardPriceText = styled.span`
  color: var(--color-grey-400);
`;

export default function Card({ src, name, bed, price, rate }) {
  return (
    <CardLayout>
      <CardImg src={src} alt={src} />
      <CardTextBox>
        <CardNameBox>
          <div>{name}</div>
          <CardRate>
            <FaStar size={12} />
            {rate}
          </CardRate>
        </CardNameBox>
        <CardTextBed>
          {bed}
          {Number(bed) === 1 ? <span>bed</span> : <span>beds</span>}
        </CardTextBed>
        <CardPrice>
          {price}
          <CardPriceText> &bull; person &bull; night</CardPriceText>
        </CardPrice>
      </CardTextBox>
    </CardLayout>
  );
}
