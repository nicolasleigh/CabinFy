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

function Logo({ large }) {
  const src = "/logo.svg";

  return (
    <div>
      <img className='mx-auto' width={large ? 300 : 200} height={large ? 300 : 200} src={src} alt='Logo' />
    </div>
  );
}

export default Logo;
