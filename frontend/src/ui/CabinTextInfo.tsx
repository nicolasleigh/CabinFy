import { useTranslation } from "react-i18next";
import { formatCurrency } from "../utils/helpers";

export default function CabinTextInfo({ bedroom, discount, regularPrice, location }) {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-2 bg-cGrey-100 mb-8'>
      <div className='text-lg md:text-xl lg:text-2xl'>
        {t("locatedin")} {location}
      </div>

      <div className='text-cGrey-700 text-sm md:text-base lg:text-lg'>
        {bedroom} {Number(bedroom) === 1 ? <span>{t("bedroom")}</span> : <span>{t("bedrooms")}</span>}{" "}
        {Boolean(discount) && (
          <span>
            {" "}
            &bull; {discount}% {t("discount")}
          </span>
        )}{" "}
        &bull; {formatCurrency(regularPrice)} {t("oneNight")}
      </div>
    </div>
  );
}
