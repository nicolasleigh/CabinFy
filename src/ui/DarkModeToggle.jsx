// import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { LuMoon, LuSun } from 'react-icons/lu';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {/* {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />} */}
      {isDarkMode ? <LuSun /> : <LuMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
