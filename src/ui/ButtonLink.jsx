import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  color: var(--color-brand-800);
  text-align: center;
  text-decoration: underline;
  text-decoration-color: var(--color-brand-800);
  text-underline-offset: 0.4rem;
  transition: all 0.3s;
  background: none;
  border: none;

  &:hover,
  &:active {
    color: var(--color-brand-600);
    text-decoration-color: transparent;
  }
`;

export default ButtonLink;
