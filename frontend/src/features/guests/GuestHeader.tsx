import GuestHeaderMenu from "./GuestHeaderMenu";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import ThemeButton from "@/components/ThemeButton";
import LanguageButton from "@/components/LanguageButton";

function GuestHeader() {
  return (
    <div className='bg-cGrey-0 fixed top-0 left-0 z-30 w-full h-16 flex justify-between items-center pr-2 sm:px-10'>
      <Link to='/' className='logo'>
        <Logo />
      </Link>
      <div className='flex items-center gap-2 sm:gap-6'>
        <ThemeButton />
        <LanguageButton />
        <GuestHeaderMenu />
      </div>
    </div>
  );
}

export default GuestHeader;
