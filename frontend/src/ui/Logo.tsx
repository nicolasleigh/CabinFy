import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  height: 2.2rem;
  width: auto;
  margin: 0 auto;

  ${(props) =>
    props.$medium &&
    css`
      height: 3.6rem;
    `}
  ${(props) =>
    props.$large &&
    css`
      height: 5.6rem;
    `}
`;

function Logo({ $large, $medium }) {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.svg" : "/logo.svg";

  return (
    <div>
      <img className='' width={200} height={200} src={src} alt='Logo' />
    </div>
  );
}

export default Logo;
