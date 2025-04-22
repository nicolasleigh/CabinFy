import { useTranslation } from "react-i18next";
import { AiOutlineCar, AiOutlineDesktop, AiOutlineSkin, AiOutlineWifi } from "react-icons/ai";
import { LuBath, LuFlower2, LuGamepad2, LuSprayCan, LuSunSnow, LuUtensilsCrossed } from "react-icons/lu";

export default function FeatureIcon() {
  const iconWithText = [
    {
      icon: <AiOutlineWifi className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "wifi",
    },
    {
      icon: <LuBath className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "hotTub",
    },
    {
      icon: <LuUtensilsCrossed className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "kitchen",
    },
    {
      icon: <LuSprayCan className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "cleanService",
    },
    {
      icon: <AiOutlineSkin className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "wardrobe",
    },
    {
      icon: <LuSunSnow className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "airCondition",
    },
    {
      icon: <LuFlower2 className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "gardenView",
    },
    {
      icon: <LuGamepad2 className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "videoGame",
    },
    {
      icon: <AiOutlineDesktop className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "32Inch",
    },
    {
      icon: <AiOutlineCar className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "parkingLot",
    },
  ];
  const { t } = useTranslation();
  return (
    <div className='grid grid-cols-2 grid-rows-[auto_1fr] mt-10 gap-y-4'>
      <p className='col-span-2 sm:text-lg md:text-xl font-semibold pb-2'>{t("cabinOffer")}</p>
      {iconWithText.map((e) => (
        <div key={e.text} className='flex items-center gap-4'>
          {e.icon}
          <span className='text-sm sm:text-base lg:text-lg'>{t(e.text)}</span>
        </div>
      ))}
    </div>
  );
}
