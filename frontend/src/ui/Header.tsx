import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const navigate = useNavigate();
  return (
    <div className='mt-4 mx-10 max-lg:mx-5 max-sm:mx-2 flex justify-between'>
      <SidebarTrigger />
      <div className='flex gap-4 justify-end'>
        <Button variant='link' onClick={() => navigate("/home")}>
          Back
        </Button>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
