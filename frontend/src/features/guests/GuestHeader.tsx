import { styled } from "styled-components";
import GuestHeaderMenu from "./GuestHeaderMenu";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import ThemeButton from "@/components/ThemeButton";
import LanguageButton from "@/components/LanguageButton";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 7rem;
  border-bottom: 1px solid var(--color-grey-100);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  display: flex;
  /* gap: 2.4rem; */
  align-items: center;
  justify-content: space-between;

  .logo {
    padding-left: 5rem;

    @media (max-width: 450px) {
      padding-left: 1.2rem;
    }

    @media (max-width: 735px) {
      padding-left: 2.2rem;
    }
  }

  .right {
    display: flex;
    gap: 4rem;
    font-size: 1.4rem;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 650px) {
      .admin-link {
        display: none;
      }
    }
  }

  @media (max-width: 1450px) {
    padding: 1.2rem 0rem;
  }
`;

function GuestHeader() {
  return (
    <div className='bg-cGrey-0 fixed top-0 left-0 z-30 w-full h-16 flex justify-between items-center pr-2 sm:px-10'>
      <Link to='/' className='logo'>
        <Logo />
      </Link>
      <div className='flex items-center gap-2 sm:gap-6'>
        {/* <Link to='/admin' className='underline-offset-4 underline hover:no-underline'>
          Admin login
        </Link> */}
        <ThemeButton />
        <LanguageButton />
        <GuestHeaderMenu />
      </div>
    </div>
  );
}

export default GuestHeader;
