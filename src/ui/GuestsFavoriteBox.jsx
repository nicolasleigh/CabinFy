import styled from 'styled-components';
import Modal from './Modal';
import GuestsReviews from './GuestsReviews';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';

const GuestsFavorite = styled.div`
  display: flex;
  padding: 2rem 2.3rem;
  margin-top: 2rem;
  gap: 2rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-grey-300);
`;

const ReviewLayout = styled(Link)`
  display: flex;
  gap: 0.6rem;
`;

const Favorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-red-600);
  font-weight: 600;
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  border-right: 1px solid var(--color-grey-200);

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;
    }
    &:last-child {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
    }
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;
    }
    &:last-child {
      font-size: 1.2rem;
      text-decoration: underline;
    }
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

export default function GuestsFavoriteBox({ reviews }) {
  const averageRating =
    reviews?.reduce((acc, review) => {
      return acc + review?.rating;
    }, 0) / reviews?.length;
  return averageRating >= 3 ? (
    <GuestsFavorite>
      <Favorite>
        <span>🎉</span>
        <span>Guests favorite</span>
      </Favorite>
      <Text>One of the most loved cabins on our website</Text>
      <Modal>
        <Modal.Open opens='reviews'>
          <ReviewLayout>
            <Star>
              <p>{Math.ceil(averageRating * 10) / 10}</p>
              <p>
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </p>
            </Star>
            <Review>
              <p>{reviews?.length}</p>
              <p>Reviews</p>
            </Review>
          </ReviewLayout>
        </Modal.Open>
        <Modal.Window name='reviews'>
          <GuestsReviews />
        </Modal.Window>
      </Modal>
    </GuestsFavorite>
  ) : null;
}
