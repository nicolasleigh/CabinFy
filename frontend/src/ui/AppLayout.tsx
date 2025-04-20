import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { styled } from "styled-components";
import GuestFooter from "../features/guests/GuestFooter";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const Footer = styled.footer`
  grid-column: 1/-1;
  background-color: var(--color-grey-50);
  border-top: 1px solid var(--color-grey-100);
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  margin-top: 6rem;
  height: 100%;

  /* overflow: scroll; */

  @media (max-width: 1200px) {
    grid-column: 1/-1;
  }
  @media (max-width: 1000px) {
    padding: 4rem 1.5rem 6.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 580px) {
    gap: 2.2rem;
  }
`;

function AppLayout() {
  return (
    <SidebarProvider>
      {/* <Sidebar /> */}
      {/* <Main> */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        {/* <Container> */}
        <div className='mt-10 mx-10 max-lg:mx-5 max-sm:mx-2'>
          <Outlet />
        </div>
        {/* </Container> */}
      </SidebarInset>
      {/* </Main> */}
      {/* <Footer>
        <GuestFooter $admin />
      </Footer> */}
    </SidebarProvider>
  );
  // return (
  //   <StyledAppLayout>
  //     <Header />
  //     <Sidebar />
  //     <Main>
  //       <Container>
  //         <Outlet />
  //       </Container>
  //     </Main>
  //     <Footer>
  //       <GuestFooter $admin />
  //     </Footer>
  //   </StyledAppLayout>
  // );
}

export default AppLayout;
