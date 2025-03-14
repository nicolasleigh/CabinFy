import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;

    @media (max-width: 900px) {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }

    /* @media (max-width: 700px) {
      font-size: 0.3rem;
      padding: 1rem 1.4rem;
    }

    @media (max-width: 580px) {
      font-size: 1rem;
      padding: 0.8rem 1.2rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
      padding: 0.5rem 0.8rem;
    } */
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;

    @media (max-width: 700px) {
      font-size: 1.2rem;
      padding: 1rem 1.4rem;
    }

    @media (max-width: 580px) {
      font-size: 1rem;
      padding: 0.8rem 1.2rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
      padding: 0.5rem 0.8rem;
    }
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  gradient: css`
    color: var(--color-red-50);

    background: rgb(246, 32, 32);
    background: linear-gradient(
      275deg,
      rgba(246, 32, 32, 0.97) 0%,
      rgba(253, 45, 96, 0.91) 100%
    );

    transition: all 0.2s ease-out;

    &:hover {
      opacity: 0.9;
      background: rgb(246, 32, 32);
      background: linear-gradient(
        275deg,
        rgba(253, 45, 96, 0.91) 0%,
        rgba(246, 32, 32, 0.97) 100%
      );
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  /* transition: background-color 0.6s ease-in-out; */

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background-color: var(--color-grey-400);
    &:hover {
      background-color: var(--color-grey-400);
    }
    &:active {
      transform: translateY(0px);
    }
  }

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
