import { SidebarTrigger } from "@/components/ui/sidebar";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <div className='mt-4 mx-10 max-lg:mx-5 max-sm:mx-2 flex justify-between'>
      <SidebarTrigger />
      <div className='flex gap-4 justify-end'>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
