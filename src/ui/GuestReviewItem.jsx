import { IoMdStar } from 'react-icons/io';
import styled from 'styled-components';

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .review {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

const Figure = styled.figure`
  display: flex;
  align-items: center;
  gap: 2rem;

  div {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
    text-align: center;
    vertical-align: middle;
    line-height: 5rem;
  }

  figcaption {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.4rem;

    .name {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  .star {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
  }
`;

export default function GuestReviewItem({ reviews, limit }) {
  if (limit) {
    reviews = reviews?.slice(0, limit);
  }
  return (
    <>
      {reviews &&
        reviews.map((review) => {
          const fullNameArr = review.guest?.fullName?.split(' ') || [];
          let shortName;
          fullNameArr.length >= 2
            ? (shortName =
                fullNameArr[0]?.chatAt(0) + fullNameArr[1]?.chatAt(0))
            : (shortName = fullNameArr[0]?.charAt(0));
          return (
            <ReviewItem key={review.id}>
              <Figure>
                <div>{shortName}</div>
                <figcaption>
                  <p className='name'>{review.guest?.fullName}</p>
                  <p className='star'>
                    {Array(review.rating)
                      .fill('')
                      .map((_, index) => (
                        <IoMdStar key={index} />
                      ))}
                  </p>
                </figcaption>
              </Figure>
              {review.comment && <div className='review'>{review.comment}</div>}
            </ReviewItem>
          );
        })}
    </>
  );
}
