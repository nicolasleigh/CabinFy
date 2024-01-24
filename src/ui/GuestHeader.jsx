import { styled } from 'styled-components';
import GuestHeaderMenu from './GuestHeaderMenu';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 7rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function GuestHeader() {
  return (
    <StyledHeader>
      <Link to='/admin'>Log in as admin user</Link>
      <GuestHeaderMenu />
    </StyledHeader>
  );
}

export default GuestHeader;
