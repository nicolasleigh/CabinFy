import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  /* height: 9.6rem; */
  height: 2.2rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  // const src = isDarkMode ? '/logo-dark.png' : ' /logo-light.png';
  const src = '/logo.svg';

  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
