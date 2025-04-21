import { useParams } from "react-router-dom";
import GuestReviewItem from "./GuestReviewItem";
import { useReviews } from "./useReviews";

export default function GuestsReviews() {
  const { cabinId } = useParams();
  const { reviews, isLoading } = useReviews(cabinId);
  return <div className='flex flex-col gap-6 '>{reviews && <GuestReviewItem reviews={reviews} />}</div>;
}
