import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useReviews } from "./useReviews";
import GuestReviewItem from "./GuestReviewItem";

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
  return <div className='flex flex-col gap-6 '>{reviews && <GuestReviewItem reviews={reviews} />}</div>;
}
