import { styled } from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className='flex gap-2'>
      <li>
        {/* <ButtonIcon onClick={() => navigate("/admin/account")} aria-label='go to account page'> */}
        <Button
          variant='outline'
          className='px-[10px]'
          onClick={() => navigate("/admin/account")}
          aria-label='go to account page'
        >
          <AiOutlineUser />
        </Button>
        {/* </ButtonIcon> */}
      </li>
      <li>
        {/* <DarkModeToggle /> */}
        <ThemeButton />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
