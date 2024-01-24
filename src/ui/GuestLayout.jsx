import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import GuestHeader from './GuestHeader';

const StyledGuestLayout = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 26rem 1fr; */
  /* grid-template-rows: auto 1fr; */
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
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
    </StyledGuestLayout>
  );
}

export default GuestLayout;
