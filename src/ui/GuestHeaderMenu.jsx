/* eslint-disable react/jsx-key */
import { FaUserCircle } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { styled } from 'styled-components';
import DropDown from './DropDown';
import { useLoginModal, useSignupModal } from '../hooks';
import { useGuest } from '../features/guests/useGuest';

const StyledGuestHeaderMenu = styled.nav`
  display: flex;
  gap: 0.6rem;
  padding: 0 5rem 0 0;

  @media (max-width: 450px) {
    padding: 0 1.2rem 0 0;
  }
`;

const NavButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  font-size: 3rem;
  color: var(--color-grey-500);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-grey-100);
    box-shadow: 0 0 0 1px var(--color-grey-300);
    outline: none;
  }
`;

const MenuButton = styled.button`
  text-align: left;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  width: 100%;
  display: inline-block;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

const HeaderAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-grey-900);
  color: var(--color-grey-100);
  text-align: center;
  vertical-align: middle;
  line-height: 3rem;
  font-size: 1.6rem;
`;

function GuestHeaderMenu() {
  const { setIsOpen: setSignupOpen } = useSignupModal();
  const { setIsOpen: setLoginOpen } = useLoginModal();
  const { guest, isLoading } = useGuest();

  const shortName = guest?.fullName?.charAt(0);

  return (
    <StyledGuestHeaderMenu>
      <DropDown
        // open={open}
        // setOpen={setOpen}
        trigger={
          <NavButton>
            <IoMdMenu size={20} />
            {guest ? (
              <HeaderAvatar>{shortName}</HeaderAvatar>
            ) : (
              <FaUserCircle />
            )}
          </NavButton>
        }
        menu={[
          <MenuButton onClick={() => setSignupOpen(true)}>Sign up</MenuButton>,
          <MenuButton onClick={() => setLoginOpen(true)}>Log in</MenuButton>,
          <MenuButton to='/3'>Log out</MenuButton>,
          <MenuButton to='/admin'>Admin user</MenuButton>,
        ]}
      />
    </StyledGuestHeaderMenu>
  );
}

export default GuestHeaderMenu;
