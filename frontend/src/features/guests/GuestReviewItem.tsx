import { AiFillStar } from "react-icons/ai";

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
                <div className='bg-cGrey-800 text-cGrey-50 rounded-full w-8 h-8 text-xs md:text-base md:w-10 md:h-10 flex items-center justify-center'>
                  {shortName}
                </div>
                <figcaption className='flex flex-col '>
                  <p className='name text-sm md:text-base'>{review.guest?.fullName}</p>
                  <p className='flex'>
                    {Array(review.rating)
                      .fill("")
                      .map((_, index) => (
                        <AiFillStar key={index} className='w-3 md:w-4' />
                      ))}
                  </p>
                </figcaption>
              </div>
              {review.comment && <div className='leading-5 text-sm md:text-base'>{review.comment}</div>}
            </div>
          );
        })}
    </>
  );
}
