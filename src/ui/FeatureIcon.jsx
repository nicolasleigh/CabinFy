import { IoWifiOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { TbWashMachine } from 'react-icons/tb';
import { BiFridge } from 'react-icons/bi';
import { TbAirConditioning } from 'react-icons/tb';
import { TbIroning1 } from 'react-icons/tb';
import { PiFirstAidKit } from 'react-icons/pi';
import { PiFirstAidKitBold } from 'react-icons/pi';
import { CgScreen } from 'react-icons/cg';
import { PiFlowerTulip } from 'react-icons/pi';
import { PiFlowerTulipBold } from 'react-icons/pi';
import { IoWifiSharp } from 'react-icons/io5';
import styled from 'styled-components';

const Featured = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  padding: 2rem 2.3rem;
  margin-top: 2rem;

  > * {
    &:first-child {
      grid-column: 1 / -1;
      font-size: 2rem;
      padding: 1rem 0;
    }
  }
`;

const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  svg {
    font-size: 2.2rem;
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
        <span>Hot tub - open 24 hours</span>
      </IconWithText>
      <IconWithText>
        <TbToolsKitchen2 />
        <span>Kitchen</span>
      </IconWithText>
      <IconWithText>
        <TbWashMachine />
        <span>Free washer machine</span>
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
