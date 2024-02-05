import { BiFridge } from 'react-icons/bi';
import { CgScreen } from 'react-icons/cg';
import { IoWifiSharp } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { PiFirstAidKitBold, PiFlowerTulipBold } from 'react-icons/pi';
import {
  TbAirConditioning,
  TbIroning1,
  TbToolsKitchen2,
  TbWashMachine,
} from 'react-icons/tb';
import styled from 'styled-components';

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
  return (
    <Featured>
      <p>What this cabin offer:</p>
      <IconWithText>
        <IoWifiSharp />
        <span>Wifi</span>
      </IconWithText>
      <IconWithText>
        <LuBath />
        <span>24 hours hot tub</span>
      </IconWithText>
      <IconWithText>
        <TbToolsKitchen2 />
        <span>Kitchen</span>
      </IconWithText>
      <IconWithText>
        <TbWashMachine />
        <span>Free washer</span>
      </IconWithText>
      <IconWithText>
        <BiFridge />
        <span>Fridge available</span>
      </IconWithText>
      <IconWithText>
        <TbAirConditioning />
        <span>Air conditioning</span>
      </IconWithText>
      <IconWithText>
        <TbIroning1 />
        <span>Iron available</span>
      </IconWithText>
      <IconWithText>
        <PiFirstAidKitBold />
        <span>First aid kit</span>
      </IconWithText>
      <IconWithText>
        <CgScreen />
        <span>32-Inch TV</span>
      </IconWithText>
      <IconWithText>
        <PiFlowerTulipBold />
        <span>Garden view</span>
      </IconWithText>
    </Featured>
  );
}
