// import { IoMdStar } from 'react-icons/io';
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Figure = styled.figure`
  display: flex;
  align-items: center;
  gap: 2rem;

  div {
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    border-radius: 50%;
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
    text-align: center;
    vertical-align: middle;

    @media (max-width: 735px) {
      width: 4rem;
      height: 4rem;
      line-height: 4rem;
    }
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

      @media (max-width: 735px) {
        font-size: 1.4rem;
      }
    }
  }

  .star {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
  }
`;

const Comment = styled.div`
  font-size: 1.3rem;
  line-height: 2.2rem;
`;

export default function GuestReviewItem({ reviews, limit }) {
  if (limit) {
    reviews = reviews?.slice(0, limit);
  }
  return (
    <>
      {reviews &&
        reviews.map((review) => {
          const fullNameArr = review.guest?.fullName?.split(" ") || [];
          let shortName;
          fullNameArr.length > 1
            ? (shortName = fullNameArr[0]?.charAt(0) + fullNameArr[1]?.charAt(0))
            : (shortName = fullNameArr[0]?.charAt(0));
          return (
            <div className='flex flex-col gap-2' key={review.id}>
              <div className='flex gap-4 items-center'>
                <div className='bg-cGrey-800 text-cGrey-50 rounded-full w-10 h-10 flex items-center justify-center'>
                  {shortName}
                </div>
                <figcaption className='flex flex-col '>
                  <p className='name'>{review.guest?.fullName}</p>
                  <p className='flex'>
                    {Array(review.rating)
                      .fill("")
                      .map((_, index) => (
                        <AiFillStar key={index} />
                      ))}
                  </p>
                </figcaption>
              </div>
              {/* <Figure>
                <div>{shortName}</div>
                <figcaption>
                  <p className='name'>{review.guest?.fullName}</p>
                  <p className='star'>
                    {Array(review.rating)
                      .fill("")
                      .map((_, index) => (
                        // <IoMdStar key={index} />
                        <AiFillStar key={index} />
                      ))}
                  </p>
                </figcaption>
              </Figure> */}
              {review.comment && <div className='leading-5'>{review.comment}</div>}
            </div>
          );
        })}
    </>
  );
}
