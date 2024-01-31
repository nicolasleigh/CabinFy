import { css, styled } from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transform: translateX(-100%);

  ${(props) =>
    props.$visible &&
    css`
      transform: translateX(0);
    `}

  transition: transform 0.4s ease-in-out;
`;

export const SidebarMenu = ({ $visible, setShowSidebar }) => {
  return (
    <StyledSidebar $visible={$visible}>
      <Logo />
      <MainNav setShowSidebar={setShowSidebar} />
    </StyledSidebar>
  );
};
