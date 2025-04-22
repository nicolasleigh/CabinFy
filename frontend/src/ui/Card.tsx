import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Card({ id, src, name, bed, price, rate, discount }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className='cursor-pointer border rounded-t-md rounded-b-md bg-cGrey-0 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl'
      onClick={() => navigate(`/cabin/${id}`)}
    >
      <img className='block border-b object-cover object-center aspect-[3/2] rounded-t-md' src={src} alt={src} />
      <div className='text-cGrey-600 py-2 px-2 rounded-b-md '>
        <div className='flex justify-between items-center'>
          <div>{name}</div>
          {rate && (
            <div className='flex items-center justify-center gap-[2px]'>
              <AiFillStar size={12} />
              {rate}
            </div>
          )}
        </div>
        <div className='text-cGrey-500 flex gap-2 items-center mb-2'>
          {bed}
          {Number(bed) === 1 ? <span>{t("bedroom")}</span> : <span>{t("bedrooms")}</span>}
        </div>
        <div className='text-sm font-semibold'>
          {price}
          {discount ? (
            <span>
              {" "}
              &bull; {discount}% {t("discount")}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
