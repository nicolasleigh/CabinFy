import styled, { keyframes } from 'styled-components';
// import { BiLoaderAlt } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

// const SpinnerMini = styled(BiLoaderAlt)`
const SpinnerMini = styled(AiOutlineLoading3Quarters)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
