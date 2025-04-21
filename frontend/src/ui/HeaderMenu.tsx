import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import LanguageButton from "@/components/LanguageButton";

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className='flex gap-2'>
      <li>
        <Button
          variant='outline'
          className='px-[10px]'
          onClick={() => navigate("/admin/account")}
          aria-label='go to account page'
        >
          <AiOutlineUser />
        </Button>
      </li>
      <li>
        <ThemeButton />
      </li>
      <li>
        <LanguageButton />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
