import styled from 'styled-components';

export const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 550px) {
    grid-template-columns: 40rem;
  }
  @media (max-width: 430px) {
    grid-template-columns: 33rem;
  }
`;
