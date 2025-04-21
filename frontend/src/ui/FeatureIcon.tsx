import { AiOutlineCar, AiOutlineDesktop, AiOutlineSkin, AiOutlineWifi } from "react-icons/ai";
import { LuBath, LuFlower2, LuGamepad2, LuSprayCan, LuSunSnow, LuUtensilsCrossed } from "react-icons/lu";

export default function FeatureIcon() {
  const iconWithText = [
    {
      icon: <AiOutlineWifi className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Wifi",
    },
    {
      icon: <LuBath className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "24 hours hot tub",
    },
    {
      icon: <LuUtensilsCrossed className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Kitchen",
    },
    {
      icon: <LuSprayCan className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Room cleaning service",
    },
    {
      icon: <AiOutlineSkin className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Bedroom wardrobe",
    },
    {
      icon: <LuSunSnow className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Air conditioning",
    },
    {
      icon: <LuFlower2 className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Garden view",
    },
    {
      icon: <LuGamepad2 className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Video game available",
    },
    {
      icon: <AiOutlineDesktop className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "32-Inch TV",
    },
    {
      icon: <AiOutlineCar className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />,
      text: "Parking lot",
    },
  ];
  return (
    <div className='grid grid-cols-2 grid-rows-[auto_1fr] mt-10 gap-y-4'>
      <p className='col-span-2 sm:text-lg md:text-xl font-semibold pb-2'>What this cabin offer:</p>
      {iconWithText.map((e) => (
        <div key={e.text} className='flex items-center gap-4'>
          {e.icon}
          <span className='text-sm sm:text-base lg:text-lg'>{e.text}</span>
        </div>
      ))}
    </div>
  );
}
