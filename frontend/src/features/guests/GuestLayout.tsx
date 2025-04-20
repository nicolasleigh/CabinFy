import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

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

  @media (max-width: 735px) {
    padding: 2rem 2.2rem 3rem;
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
    <div className='bg-cGrey-100'>
      <GuestHeader />
      <div className='pt-20 px-2 pb-5 sm:px-6 sm:pt-24 md:pt-28 sm:pb-14 lg:pt-32 lg:px-16 lg:pb-20'>
        <div className='max-w-[1200px] mx-auto'>
          <Outlet />
        </div>
      </div>
      {/* <GuestFooter /> */}
    </div>
  );
}

export default GuestLayout;
