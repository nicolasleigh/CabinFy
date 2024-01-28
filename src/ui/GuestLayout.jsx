import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import GuestHeader from './GuestHeader';
import GuestFooter from './GuestFooter';

const StyledGuestLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-100);
  /* grid-template-columns: 26rem 1fr; */
  /* grid-template-rows: auto 1fr; */
  /* height: 100vh; */
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 2rem 4.8rem 3rem;
  margin-top: 6rem;
  /* overflow: scroll; */

  @media (max-width: 450px) {
    padding: 2rem 1.2rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;
  gap: 3.2rem; */
`;

function GuestLayout() {
  return (
    <StyledGuestLayout>
      <GuestHeader />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <GuestFooter />
    </StyledGuestLayout>
  );
}

export default GuestLayout;
