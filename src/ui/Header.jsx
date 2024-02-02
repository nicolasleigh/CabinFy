import { styled } from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';
import { IoIosList } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuMenu } from 'react-icons/lu';
import ButtonIcon from './ButtonIcon';
import ButtonGroup from './ButtonGroup';
import { useState } from 'react';
import { SidebarMenu } from './SidebarMenu';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: flex-end;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  .menuBtn {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-column: 1/-1;
    .menuBtn {
      display: block;
      position: absolute;
      left: 4rem;
    }
  }

  @media (max-width: 1000px) {
    .menuBtn {
      left: 1rem;
    }

    padding: 1.2rem 1rem;
  }
`;

const GuestPageBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  font-size: 1.2rem;
  color: var(--color-grey-400);
  margin-right: 2.4rem;

  @media (max-width: 500px) {
    font-size: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 400px) {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
`;

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const ref = useOutsideClick(() => setShowSidebar(false));
  return (
    <StyledHeader ref={ref}>
      <ButtonIcon onClick={() => setShowSidebar(true)} className='menuBtn'>
        <LuMenu />
      </ButtonIcon>
      <ButtonGroup>
        <GuestPageBtn to='/home'>Back to guest page</GuestPageBtn>
        <UserAvatar />
        <HeaderMenu />
      </ButtonGroup>
      <SidebarMenu $visible={showSidebar} setShowSidebar={setShowSidebar} />
    </StyledHeader>
  );
}

export default Header;
