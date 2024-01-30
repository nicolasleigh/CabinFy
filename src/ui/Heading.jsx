import { css, styled } from 'styled-components';

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media (max-width: 650px) {
        font-size: 2.5rem;
        font-weight: 500;
      }
      @media (max-width: 500px) {
        font-size: 2.2rem;
        font-weight: 500;
      }
      @media (max-width: 430px) {
        font-size: 1.8rem;
        font-weight: 500;
      }
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;

      @media (max-width: 800px) {
        font-size: 1.8rem;
        font-weight: 500;
      }
    `}
    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;

      @media (max-width: 550px) {
        font-size: 2.5rem;
        font-weight: 500;
      }
    `}
`;

export default Heading;
