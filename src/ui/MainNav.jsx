// import {
//   HiOutlineCalendarDays,
//   HiOutlineCog6Tooth,
//   HiOutlineHome,
//   HiOutlineHomeModern,
// } from 'react-icons/hi2';
import {
  AiOutlineHome,
  AiOutlineSchedule,
  AiOutlineBarChart,
  AiOutlineSetting,
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ setShowSidebar }) {
  const handleCloseSidebar = () => {
    setShowSidebar ? setShowSidebar(false) : null;
  };

  return (
    <nav>
      <NavList>
        <li onClick={handleCloseSidebar}>
          <StyledNavLink to='/admin/dashboard'>
            {/* <HiOutlineHome /> */}
            <AiOutlineBarChart />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li onClick={handleCloseSidebar}>
          <StyledNavLink to='/admin/bookings'>
            {/* <HiOutlineCalendarDays /> */}
            <AiOutlineSchedule />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li onClick={handleCloseSidebar}>
          <StyledNavLink to='/admin/cabins'>
            <AiOutlineHome />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to='/users'>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li> */}
        <li onClick={handleCloseSidebar}>
          <StyledNavLink to='/admin/settings'>
            {/* <HiOutlineCog6Tooth /> */}
            <AiOutlineSetting />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
export default MainNav;
