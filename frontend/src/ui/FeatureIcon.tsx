// import { BiFridge } from 'react-icons/bi';
// import { CgScreen } from 'react-icons/cg';
// import { IoWifiSharp } from 'react-icons/io5';
import { LuBath, LuUtensilsCrossed, LuSunSnow, LuFlower2, LuGamepad2, LuSprayCan } from "react-icons/lu";
// import { PiFirstAidKitBold, PiFlowerTulipBold } from 'react-icons/pi';
// import {
//   TbAirConditioning,
//   TbIroning1,
//   TbToolsKitchen2,
//   TbWashMachine,
// } from 'react-icons/tb';
import { AiOutlineCar, AiOutlineDesktop, AiOutlineWifi, AiOutlineSkin } from "react-icons/ai";
import styled from "styled-components";

const Featured = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  padding: 2rem 2.3rem;
  margin-top: 2rem;

  grid-column: 1/2;
  grid-row: 3/4;

  > * {
    &:first-child {
      grid-column: 1 / -1;
      font-size: 2rem;
      padding: 1rem 0;
    }
  }

  @media (max-width: 1100px) {
    padding: 0;
    gap: 1rem;

    font-size: 1.4rem;
  }

  @media (max-width: 830px) {
    font-size: 1.2rem;
  }
  @media (max-width: 735px) {
    font-size: 1rem;
  }
  @media (max-width: 630px) {
    grid-column: 1/-1;
    font-size: 1.6rem;
  }
  @media (max-width: 380px) {
    font-size: 1.3rem;
  }
`;

const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  svg {
    font-size: 2.2rem;
  }

  @media (max-width: 1100px) {
    svg {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 830px) {
    svg {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 735px) {
    svg {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 630px) {
    padding: 0 3rem 0;
    svg {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 510px) {
    padding: 0;
    svg {
      font-size: 1.5rem;
    }
  }
`;

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
