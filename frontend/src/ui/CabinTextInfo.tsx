import { formatCurrency } from "../utils/helpers";

export default function CabinTextInfo({ bedroom, discount, regularPrice, location }) {
  return (
    <div className='flex flex-col gap-2 bg-cGrey-100 mb-8'>
      <div className='text-lg md:text-xl lg:text-2xl'>Located in: {location}</div>

      <div className='text-cGrey-700 text-sm md:text-base lg:text-lg'>
        {bedroom} {Number(bedroom) === 1 ? <span>bedroom</span> : <span>bedrooms</span>}{" "}
        {Boolean(discount) && <span> &bull; {discount}% discount</span>} &bull; {formatCurrency(regularPrice)} night
      </div>
    </div>
  );
}
