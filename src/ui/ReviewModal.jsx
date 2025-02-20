import styled from 'styled-components';
import GuestAddReview from '../features/guests/GuestAddReview';
import GuestsReviews from '../features/guests/GuestsReviews';
import Modal from './Modal';

const ModalBox = styled.div`
  display: flex;
  gap: 3rem;

  grid-column: 1/2;
  grid-row: 5/6;

  @media (max-width: 630px) {
    grid-column: 1/-1;
    grid-row: 5/6;

    padding: 0 2.3rem;
  }

  @media (max-width: 450px) {
    padding: 0;
  }
`;

const ReviewBtn = styled.button`
  display: block;
  text-decoration: underline;
  border: none;
  background: none;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);

  &:focus {
    outline: none;
  }

  @media (max-width: 1100px) {
    padding: 2rem 0 0 0;
    font-size: 1.2rem;
  }

  @media (max-width: 630px) {
    padding: 0;
  }
`;

export default function ReviewModal({ reviews }) {
  return (
    <ModalBox>
      <Modal>
        <Modal.Open
          {...(reviews?.length ? { opens: 'reviews' } : { opens: 'none' })}
        >
          <ReviewBtn>Sell all reviews</ReviewBtn>
        </Modal.Open>
        <Modal.Window name='reviews'>
          <GuestsReviews />
        </Modal.Window>
        <Modal.Window name='none'>
          <p style={{ paddingTop: '20px' }}>No more reviews</p>
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens='add-review'>
          <ReviewBtn>Add review</ReviewBtn>
        </Modal.Open>
        <Modal.Window name='add-review'>
          <GuestAddReview />
        </Modal.Window>
      </Modal>
    </ModalBox>
  );
}
