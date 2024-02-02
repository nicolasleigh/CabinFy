import { IoMdStar } from 'react-icons/io';
import styled from 'styled-components';
import { useReviews } from '../features/guests/useReviews';
import { useParams } from 'react-router-dom';
import GuestReviewItem from './GuestReviewItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;
`;

export default function GuestsReviews() {
  const { cabinId } = useParams();
  const { reviews, isLoading } = useReviews(cabinId);
  // console.log(reviews);
  return <Layout>{reviews && <GuestReviewItem reviews={reviews} />}</Layout>;
}
