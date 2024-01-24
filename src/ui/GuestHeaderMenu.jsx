/* eslint-disable react/jsx-key */
import { FaUserCircle } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { styled } from 'styled-components';
import DropDown from './DropDown';
import { useLoginModal, useSignupModal } from '../hooks';

const StyledGuestHeaderMenu = styled.nav`
  display: flex;
  gap: 0.6rem;
`;

const NavButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.2rem;
  font-size: 2.5rem;
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

function GuestHeaderMenu() {
  const { setIsOpen: setSignupOpen } = useSignupModal();
  const { setIsOpen: setLoginOpen } = useLoginModal();
  // const [open, setOpen] = useState(false);

  return (
    <StyledGuestHeaderMenu>
      <DropDown
        // open={open}
        // setOpen={setOpen}
        trigger={
          <NavButton>
            <IoMdMenu size={20} />
            <FaUserCircle />
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
