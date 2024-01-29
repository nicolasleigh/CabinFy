import styled from 'styled-components';
import Modal from './Modal';
import GuestsReviews from './GuestsReviews';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';

const GuestsFavorite = styled.div`
  display: flex;
  padding: 2rem 2.3rem;
  /* margin-top: 2rem; */
  gap: 1.4rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-grey-300);
  grid-column: 1/2;
  grid-row: 2/3;
  width: 94%;

  @media (max-width: 1000px) {
    padding: 1rem 1rem;
    gap: 1rem;
  }
  @media (max-width: 830px) {
    grid-column: 1/-1;
    margin: 0 auto;
  }

  @media (max-width: 450px) {
    padding: 1rem 0.5rem;
    gap: 0;
    width: 100%;
  }
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
  text-align: center;

  & span:last-child {
    @media (max-width: 380px) {
      font-size: 1rem;
    }
  }
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  border-right: 1px solid var(--color-grey-200);

  @media (max-width: 450px) {
    padding-right: 0.3rem;
  }

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;

      @media (max-width: 450px) {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    &:last-child {
      font-size: 1.4rem;
      display: flex;
      align-items: center;

      @media (max-width: 450px) {
        font-size: 1.2rem;
      }
    }
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;

  @media (max-width: 450px) {
    padding-left: 0.3rem;
  }

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;

      @media (max-width: 450px) {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    &:last-child {
      font-size: 1.2rem;
      text-decoration: underline;

      @media (max-width: 450px) {
        font-size: 1rem;
      }
    }
  }
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 380px) {
    font-size: 1.3rem;
  }
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
      <Text>One of the most loved cabins</Text>
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
